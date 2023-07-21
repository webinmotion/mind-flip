CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

drop table if exists tbl_High_Scores;
drop table if exists tbl_Game_Tally;
drop table if exists tbl_Game_Engine;
drop table if exists tbl_Game_Player;
drop table if exists tbl_Game_Layout;
drop table if exists tbl_Game_Placard;
drop table if exists tbl_Choice;
drop table if exists tbl_Question;
drop table if exists tbl_Game;
drop table if exists tbl_Account;
drop table if exists tbl_Player;
drop table if exists tbl_Playbook;
drop table if exists tbl_Ticker;

DROP TYPE IF EXISTS GameCategory;
DROP TYPE IF EXISTS GameProgression;
DROP TYPE IF EXISTS GameStatus;
DROP TYPE IF EXISTS PlayerType;
DROP TYPE IF EXISTS AccountRole;

CREATE TYPE GameCategory AS ENUM (
	'general',
	'science',
    'geography',
    'history',
    'music',
    'movies',
    'television',
    'sports',
    'food',
    'travel',
    'politics'
);

CREATE TYPE GameProgression AS ENUM (
	'auto',
	'manual'
);

CREATE TYPE GameStatus AS ENUM (
	'Created',
	'Accepting',
    'Playing',
    'Completed',
    'Archived'
);

CREATE TYPE PlayerType AS ENUM (
	'guest',
	'registered',
	'business'
);

CREATE TYPE AccountRole AS ENUM (
	'Basic',
	'Organizer',
    'Administrator'
);

create table if not exists tbl_Ticker (
	ticker_id int primary key not null,
	ticker_title varchar(64) unique not null,
	pre_countdown_delay int default 5000,
	countdown_duration int default 10000,
	countdown_interval int default 100,
	post_countdown_delay int default 5000
);

create table if not exists tbl_Playbook (
	playbook_id UUID default uuid_generate_v1(),
	title varchar(32) not null,
	best_fit varchar(128),
	description varchar(1024) not null,
	date_created date default now()
);

create table if not exists tbl_Player (
	player_id UUID default uuid_generate_v1(),
    screen_name varchar(32) unique not null,
    email_address varchar(128) unique not null,
    verified_email boolean default false,
    verification_code varchar(40) default null,
    player_type PlayerType default 'guest',
    phone_number varchar(15) default null,
    verified_phone boolean default false,
    date_joined date default now(),
    points bigint default 0,
    city varchar(32),
    state varchar(32),
    country varchar(32),
    constraint pk_player primary key(player_id)
);

create table if not exists tbl_Account (
	account_id UUID default uuid_generate_v1(),
    username varchar(16) unique not null,
    userpass varchar(256) not null,
    is_active boolean default true,
    account_role AccountRole default 'Basic',
    recovery_code varchar(40) default null,
    player_fk UUID not null references tbl_Player(player_id) on delete cascade,
    constraint pk_account primary key(account_id)
);

create table if not exists tbl_Game (
    game_id UUID default uuid_generate_v1(),
    title varchar(64) not null,
    description varchar(256),
    organizer UUID references tbl_Account(account_id) not null,
    game_status GameStatus not null default 'Created',
    constraint pk_game primary key(game_id)
);

create table if not exists tbl_Question (
    que_id UUID default uuid_generate_v1(),
    que_value varchar(256) unique not null,
    que_answer varchar(32) not null,
    category GameCategory default 'general',
    asked_by UUID references tbl_Player(player_id) not null,
    has_choices boolean default false,
    max_points integer default 0,
    publish_time timestamp default now(),
    constraint pk_question primary key(que_id)
);

create table if not exists tbl_Choice (
    choice_id UUID default uuid_generate_v1(),
	question_fk UUID references tbl_Question(que_id) not null,
    is_correct boolean default false,
    choice_value varchar(32) not null,
    clue varchar(64),
	constraint pk_multiple_choice primary key(choice_id),
	constraint uniq_choice unique (choice_value, question_fk)
);

create table if not exists tbl_Game_Placard (
	placard_id UUID default uuid_generate_v1(),
	placard_content varchar(512) not null,
	display_duration int default 5000,
	followed_by UUID references tbl_Game_Placard(placard_id),
	constraint pk_placard_id primary key(placard_id)
);

create table if not exists tbl_Game_Layout (
	game_fk UUID references tbl_Game(game_id) not null,
	question_fk UUID references tbl_Question(que_id) not null,
	current_section int default 1,
	section_index int not null,
	content_label varchar(32) not null,
	placard_fk UUID references tbl_Game_Placard(placard_id) default null,
	constraint pk_game_layout primary key(game_fk, question_fk, current_section)
);

create table if not exists tbl_Game_Player (
	participant_id UUID default uuid_generate_v1(),
	game_fk UUID references tbl_Game(game_id) not null,
	player_fk UUID references tbl_Player(player_id) not null,
	has_exited boolean default false,
	constraint uniq_player unique (game_fk, player_fk),
	constraint pk_game_player unique (participant_id)
);

create table if not exists tbl_Game_Engine (
	game_fk UUID references tbl_Game(game_id) not null,
	scheduled_start timestamp not null,
	current_section int default 1,
	section_index int default 1,
	progression GameProgression default 'manual',
	allow_nav_back boolean default false,
	server_push_mode boolean default true,
	game_ticker int references tbl_Ticker(ticker_id) default 300,
	constraint pk_game_weaver primary key(game_fk)
);

create table if not exists tbl_Game_Tally (
	participant_fk UUID references tbl_Game_Player(participant_id) not null,
	question_fk UUID references tbl_Question(que_id) not null,
	answer_submitted varchar(32),
	clock_remaining int default 0,
	tally_points int default 0,
	constraint uniq_response unique (participant_fk, question_fk)
);

create table if not exists tbl_High_Scores (
	account_fk UUID references tbl_Account(account_id) not null,
	high_score int not null,
	date_scored timestamp default now(),
	constraint pk_high_score primary key(account_fk, high_score)
);

--describe game playbooks
insert into tbl_Playbook (title, best_fit, description) values
(
'free_form_forward_only',
'question not having multiple choices - the question has a free-form response that requres typing, like with a quiz or exam',
'The response should match the correct answer as closely as possible, as defined by the response criteria.

- question does not have multiple choices.
- question has no timer.
- player can only more forward with no option to skip and go back.
- response to the question is free-form and requires typing, like with a quiz or exam'
),
(
'free_form_free_flow',
'question not having multiple choices - the question has a free-form response that requres typing, like with a quiz or exam',
'The response should match the correct answer as closely as possible, as defined by the response criteria.

- question does not have multiple choices.
- question has no timer.
- player can only more forward and backwards freely
- response to the question is free-form and requires typing, like with a quiz or exam'
),
(
'clue_swipe_out',
'question having multiple choices only',
'Wrong choices are **_swiped_** out

- Each choice is **_swiped_** out as time winds down.
- Points decrease as the available time remaining decreases.
- No points are available when the clock runs out.

Example

- Points start at 1000.
- Delay countdown for 5 seconds (allow player to read question and consider choices)
- start countdown
- for every two seconds, remove a wrong choice from the list of choices.
- Shave off 100 points per second
- when clock reaches zero, reveal the correct answer and a reason why'
),
(
'elimination_clues',
'question having multiple choices only',
'Clues for the incorrect choices are **_swopped_** in

- Each clue is associated with exactly one choice.
- Each clue informs whether the choice is correct or incorrect.
- Each clue is revealed one at a time with delays in between.
- Points decrease as the available time remaining decreases.
- No points are available when the clock runs out.

Example

- Points start at 1000.
- Delay countdown for 5 seconds (allow player to read question and consider choices)
- start countdown
- for every two seconds, reveal a clue for an incorrect choice.
- Shave off 100 points per second
- when clock reaches zero, reveal confirmation of correct answer'
),
(
'closest_but_not_over',
'question having numeric answer only',
'The anwser to thie question must to be a numeric value

- Answers that match the exact numeric value get maximum points.
- Points decrease with increasing distacne from the correct value.
- Any answer above correct value gets no points.
- Any answer below 1 percent of the correct value gets no points either.

The UI is very similar to that of free_form except that the response submited can ONLY be a numeric value.'
),
(
'choice_matcher',
'question having multiple choices only',
'Each matcher is associated with exactly one choice only.'
);

--create default tickers
insert into tbl_ticker (ticker_id, ticker_title, pre_countdown_delay, post_countdown_delay, countdown_interval, countdown_duration) values (100, 'no time ticker', -1, -1, -1, -1);
insert into tbl_ticker (ticker_id, ticker_title, pre_countdown_delay, post_countdown_delay) values (200, 'aggresive ticker', 0, 0);
insert into tbl_ticker (ticker_id, ticker_title, pre_countdown_delay, post_countdown_delay) values (300, '2 seconds cushion', 2000, 2000);

-- register some new players
insert into tbl_player (email_address, screen_name, player_type) values ('jimmy@email.com', 'thirsty whale', 'registered');
insert into tbl_player (email_address, screen_name) values ('winnie@email.com', 'crocked pots');
insert into tbl_player (email_address, screen_name) values ('kadzoe@email.com', 'rustic beaver');
insert into tbl_player (email_address, screen_name) values ('wakili@email.com', 'dancing fish');
insert into tbl_player (email_address, screen_name) values ('julisha@email.com', 'laughing hyena');

--register an account
with author1 as (select player_id from tbl_player where email_address = 'jimmy@email.com')
insert into tbl_account (username, userpass, player_fk) values ('thirsty_whale', 's3cr3ts1', (select player_id from author1));

with author2 as (select player_id from tbl_player where email_address = 'kadzoe@email.com')
insert into tbl_account (username, userpass, player_fk) values ('rustic_beaver', 's3cr3ts!', (select player_id from author2));

--create a question
with author as (select player_id from tbl_player where email_address = 'jimmy@email.com')
insert into tbl_question (que_value, que_answer, has_choices, max_points, asked_by) values
('Trivia, Quizes and Gotchas', '', false, 0, (select player_id from author)),
('1 + 1', '2', true, 5000, (select player_id from author)),
('2 + 1', '3', true, 5000, (select player_id from author)),
('3 + 1', '4', false, 5000, (select player_id from author)),
('4 + 1', '5', false, 5000, (select player_id from author)),
('5 + 1', '6', false, 5000, (select player_id from author)),
('6 + 1', '7', true, 5000, (select player_id from author)),
('7 + 1', '8', true, 5000, (select player_id from author)),
('8 + 1', '9', false, 5000, (select player_id from author)),
('9 + 1', '10', false, 5000, (select player_id from author));

--(optional) create multiple choices for a question
with question as (select que_id from tbl_question where que_value = '1 + 1')
insert into tbl_choice ( question_fk, is_correct, choice_value, clue) values
((select que_id from question), true, 2, 'double double it is'),
((select que_id from question), false, 1, 'single is not right'),
((select que_id from question), false, 0, 'nothingness is not an option'),
((select que_id from question), false, 3, 'triple sec is a drink'),
((select que_id from question), false, 4, 'quad is an offroad vehicle');

--(optional) insert multiple choice options for the answers
with question as (select que_id from tbl_question where que_value = '2 + 1')
insert into tbl_choice ( question_fk, is_correct, choice_value, clue) values
((select que_id from question), false, 2, 'double the trouble ain''t it'),
((select que_id from question), false, 1, 'single is not right'),
((select que_id from question), false, 0, 'nothingness is not an option'),
((select que_id from question), true, 3, 'third time is a charm'),
((select que_id from question), false, 4, 'quad is an offroad vehicle');

--(optional) insert multiple choice options for the answers
with question as (select que_id from tbl_question where que_value = '6 + 1')
insert into tbl_choice ( question_fk, is_correct, choice_value, clue) values
((select que_id from question), false, 3, 'double the trouble ain''t it'),
((select que_id from question), false, 5, 'single is not right'),
((select que_id from question), false, 0, 'nothingness is not an option'),
((select que_id from question), true, 7, 'third time is a charm'),
((select que_id from question), false, 9, 'quad is an offroad vehicle');

--(optional) insert multiple choice options for the answers
with question as (select que_id from tbl_question where que_value = '7 + 1')
insert into tbl_choice ( question_fk, is_correct, choice_value, clue) values
((select que_id from question), false, 8, 'double the trouble ain''t it'),
((select que_id from question), false, 6, 'single is not right'),
((select que_id from question), false, 2, 'nothingness is not an option'),
((select que_id from question), true, 0, 'third time is a charm'),
((select que_id from question), false, 4, 'quad is an offroad vehicle');

--create a game
insert into tbl_game (organizer, title, game_status) values
((select ta.account_id from tbl_account ta join tbl_player tp on ta.player_fk = tp.player_id where tp.email_address = 'jimmy@email.com'), 'friendly numbers', 'Playing');
insert into tbl_game (organizer, title, game_status) values
((select ta.account_id from tbl_account ta join tbl_player tp on ta.player_fk = tp.player_id where tp.email_address = 'jimmy@email.com'), 'around and about', 'Created');

--create game placards
with game1 as (select game_id from tbl_game where title = 'friendly numbers')
insert into tbl_game_placard (placard_content, display_duration ) values
('game is about to start', 3000),
('enjoy the game', 3000),
('taking a snack break', 3000),
('enjoying the game? tip your waiter', 3000),
('game is now resuming', 3000),
('it was a blast having you', 3000);

--assign order to the placards
update tbl_game_placard set followed_by = (select placard_id from tbl_game_placard where placard_content = 'enjoy the game')
where placard_content = 'game is about to start';
update tbl_game_placard set followed_by = (select placard_id from tbl_game_placard where placard_content = 'enjoying the game? tip your waiter')
where placard_content = 'taking a snack break';
update tbl_game_placard set followed_by = (select placard_id from tbl_game_placard where placard_content = 'game is now resuming')
where placard_content = 'enjoying the game? tip your waiter';

--create a game layout
with game1 as (select game_id from tbl_game where title = 'friendly numbers')
insert into tbl_game_layout (game_fk, question_fk, current_section, section_index, content_label, placard_fk) values
((select game_id from game1), (select que_id from tbl_question tq where tq.que_value = 'Trivia, Quizes and Gotchas'), 1, 1, 'Starting...',
(select placard_id from tbl_game_placard where placard_content = 'game is about to start')),
((select game_id from game1), (select que_id from tbl_question tq where tq.que_value = '1 + 1'), 1, 2, '1', null),
((select game_id from game1), (select que_id from tbl_question tq where tq.que_value = '2 + 1'), 1, 3, '2', null),
((select game_id from game1), (select que_id from tbl_question tq where tq.que_value = '3 + 1'), 1, 4, '3', null),
((select game_id from game1), (select que_id from tbl_question tq where tq.que_value = '4 + 1'), 1, 5, '4', null),
((select game_id from game1), (select que_id from tbl_question tq where tq.que_value = '5 + 1'), 1, 6, '5',
(select placard_id from tbl_game_placard where placard_content = 'taking a snack break')),
((select game_id from game1), (select que_id from tbl_question tq where tq.que_value = '6 + 1'), 2, 1, '1', null),
((select game_id from game1), (select que_id from tbl_question tq where tq.que_value = '7 + 1'), 2, 2, '2', null),
((select game_id from game1), (select que_id from tbl_question tq where tq.que_value = '8 + 1'), 2, 3, '3', null),
((select game_id from game1), (select que_id from tbl_question tq where tq.que_value = '9 + 1'), 2, 4, '4',
(select placard_id from tbl_game_placard where placard_content = 'it was a blast having you'));

--join a game to participate
with game1 as (select game_id from tbl_game where title = 'friendly numbers')
insert into tbl_game_player (game_fk, player_fk) values
((select game_id from game1), (select player_id from tbl_player where email_address = 'jimmy@email.com')),
((select game_id from game1), (select player_id from tbl_player where email_address = 'winnie@email.com')),
((select game_id from game1), (select player_id from tbl_player where email_address = 'kadzoe@email.com')),
((select game_id from game1), (select player_id from tbl_player where email_address = 'wakili@email.com')),
((select game_id from game1), (select player_id from tbl_player where email_address = 'julisha@email.com'));

--prepare to fire up a game
with game1 as (select game_id from tbl_game where title = 'friendly numbers')
insert into tbl_game_engine (game_fk, scheduled_start) values ((select game_id from game1), now());

--start racking up points
with question1 as (select que_id from tbl_question where que_value = '1 + 1')
insert into tbl_game_tally (participant_fk, question_fk, answer_submitted, clock_remaining, tally_points) values
((select gp.participant_id from tbl_game_player gp inner join tbl_player p on p.player_id = gp.player_fk
where p.email_address = 'jimmy@email.com'), (select que_id from question1), '3', 5000, 0);

--fetch game using title and organizer email
select * from tbl_game where title = 'friendly numbers' and organizer = (
        select a.account_id from tbl_account a inner join tbl_player p on a.player_fk = p.player_id
        where p.email_address = 'jimmy@email.com');

--fetch ticker info
select * from tbl_ticker tk where tk.ticker_title = 'no time ticker';

--fetch game info
select * from tbl_game where title = 'friendly numbers';

--fetch game layout
select * from tbl_game_layout where game_fk = (select game_id from tbl_game where title = 'friendly numbers')
order by current_section, section_index;

--fetch game question
select * from tbl_question tq where que_value = '1 + 1';

--fetch account given participant
select ta.* from tbl_account ta
        inner join tbl_player tp on ta.player_fk = tp.player_id
        inner join tbl_game_player tgp on tgp.player_fk = tp.player_id
        where tgp.participant_id = 'f2c5ebde-ee85-11ed-b6a9-3f0ebfee5bdd'::uuid;

--fetch high score
select high_score from tbl_high_scores where account_fk = 'cebe90e0-ef36-11ed-b6b8-337def8e2c26'::uuid order by high_score desc;

-- --join as participant
-- insert into tbl_game_player (game_fk, player_fk) values ('f3abcfec-f25d-11ed-a4aa-0242ac110002'::uuid, 'eba84dc0-f25d-11ed-a4aa-0242ac110002'::uuid)
-- on conflict (game_fk, player_fk) do update set has_exited = false returning participant_id;

-- --add high score
-- insert into tbl_high_scores (account_fk, high_score) values ('cebe90e0-ef36-11ed-b6b8-337def8e2c26'::uuid, 230)
-- on conflict (account_fk, high_score) do update set high_score = 2404;

update tbl_player set verification_code = 'some random code' where email_address = 'jimmy@email.com';

with target_record as (select player_id from tbl_player where email_address = 'jimmy@email.com' and verification_code = 'some random code')
    update tbl_player set verified_email = true where player_id = (select player_id from target_record) returning verified_email;

with target_record as (select player_id from tbl_player where email_address = 'jimmy@email.com')
    update tbl_player set verified_email = false where player_id = (select player_id from target_record) returning verified_email;

select exists(select 1 from tbl_player where screen_name='crap$1');

select player_id, verified_email from tbl_player P where P.email_address = 'happy.camper@venus.com'
    and verified_email is true and player_type != 'guest';

--listing of trivia (landing page)
select G.*, P.* from tbl_Game G
join tbl_account A on A.account_id = G.organizer
join tbl_player P on P.player_id = A.player_fk
where A.is_active = true
	and G.game_status in ('Created', 'Accepting', 'Playing');

--delete from tbl_account where username = 'omolloc';
--delete from tbl_player where screen_name = 'mainas';

--with target_record as (select player_id from tbl_player where email_address = $1 and verification_code = 'e79ea91b-3952-4234-b2bb-9b0a4377ef39')
--    update tbl_player set verified_email = true where player_id = (select player_id from target_record) returning verified_email

--select ta.* from tbl_account ta join tbl_player tp on ta.player_fk = tp.player_id where tp.email_address = 'jimmy@email.com'

--select tg.*, tp.* from tbl_game tg
--inner join tbl_account ta on tg.organizer = ta.account_id
--inner join tbl_player tp on ta.player_fk = tp.player_id
--where tg.game_id = '7d9c5730-0d8e-11ee-b8cb-022ac110002'::uuid;

select tg.*, tp.* from tbl_game tg
    inner join tbl_account ta on tg.organizer = ta.account_id
    inner join tbl_player tp on ta.player_fk = tp.player_id
    where tg.title = 'friendly numbers' and tp.email_address = 'jimmy@email.com';

select * from tbl_game_player gp inner join tbl_player p on p.player_id = gp.player_fk;

delete from tbl_game_player where player_fk = (select player_id from tbl_player where email_address in ('zes.ty@aol.com', 'mainacell@gmail.com', 'm41na@yahoo.com'));
delete from tbl_account where username in ('zumba', 'one');
delete from tbl_player where email_address in ('zes.ty@aol.com', 'mainacell@gmail.com', 'm41na@yahoo.com');
update tbl_game_engine set progression = 'manual' where game_fk = (select game_id from tbl_game where title = 'friendly numbers');

select gt.participant_fk, sum(gt.tally_points) from tbl_game_tally gt
    inner join tbl_game_player gp on gp.participant_id = gt.participant_fk
    where gp.game_fk = (select game_id from tbl_Game where title = 'friendly numbers')
    group by gt.participant_fk;

--recursive query for related rows
with recursive game_extras as (
	select parent.*, 1 as "order"
	from tbl_game_placard parent
	where parent.placard_content = 'taking a snack break'

	union all

	select child.*, (p."order" + 1)
	from tbl_game_placard child, game_extras p
	where child.placard_id = p.followed_by

) select * from game_extras;
