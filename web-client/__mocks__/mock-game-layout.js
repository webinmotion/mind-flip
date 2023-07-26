export const gameEngine = {
    "progression": 'manual'
}

export const gameInfo = {
    "game": {
        "game_id": "7d9c5730-0d8e-11ee-b8cb-0242ac110002",
        "description": null,
        "game_status": "Accepting"
    },
    "organizer": {
        "player_id": "7d97756c-0d8e-11ee-b8cb-0242ac110002",
        "screen_name": "thirsty whale",
        "email_address": "jimmy@email.com",
        "city": null,
        "state": null,
        "country": null
    }
}

export const gameLayout = [
    {
        "game_fk": "7d9c5730-0d8e-11ee-b8cb-0242ac110002",
        "question_fk": "09d8eab0-1032-11ee-b339-0242ac110002",
        "current_section": 1,
        "section_index": 1,
        "question": {
            "que_value": "1 + 1",
            "que_answer": "2",
            "category": "general",
            "asked_by": "7d97756c-0d8e-11ee-b8cb-0242ac110002",
            "has_choices": true,
            "max_points": 5000
        },
        "choices": [
            {
                "choice_id": "09d9900a-1032-11ee-b339-0242ac110002",
                "question_fk": "09d8eab0-1032-11ee-b339-0242ac110002",
                "is_correct": true,
                "choice_value": "2",
                "clue": "double double it is"
            },
            {
                "choice_id": "09d994e2-1032-11ee-b339-0242ac110002",
                "question_fk": "09d8eab0-1032-11ee-b339-0242ac110002",
                "is_correct": false,
                "choice_value": "1",
                "clue": "single is not right"
            },
            {
                "choice_id": "09d99532-1032-11ee-b339-0242ac110002",
                "question_fk": "09d8eab0-1032-11ee-b339-0242ac110002",
                "is_correct": false,
                "choice_value": "0",
                "clue": "nothingness is not an option"
            },
            {
                "choice_id": "09d9956e-1032-11ee-b339-0242ac110002",
                "question_fk": "09d8eab0-1032-11ee-b339-0242ac110002",
                "is_correct": false,
                "choice_value": "3",
                "clue": "triple sec is a drink"
            },
            {
                "choice_id": "09d995a0-1032-11ee-b339-0242ac110002",
                "question_fk": "09d8eab0-1032-11ee-b339-0242ac110002",
                "is_correct": false,
                "choice_value": "4",
                "clue": "quad is an offroad vehicle"
            }
        ]
    },
    {
        "game_fk": "7d9c5730-0d8e-11ee-b8cb-0242ac110002",
        "question_fk": "09d8f000-1032-11ee-b339-0242ac110002",
        "current_section": 1,
        "section_index": 2,
        "question": {
            "que_value": "2 + 1",
            "que_answer": "3",
            "category": "general",
            "asked_by": "7d97756c-0d8e-11ee-b8cb-0242ac110002",
            "has_choices": true,
            "max_points": 5000
        },
        "choices": [
            {
                "choice_id": "09da680e-1032-11ee-b339-0242ac110002",
                "question_fk": "09d8f000-1032-11ee-b339-0242ac110002",
                "is_correct": false,
                "choice_value": "2",
                "clue": "double the trouble ain't it"
            },
            {
                "choice_id": "09da6958-1032-11ee-b339-0242ac110002",
                "question_fk": "09d8f000-1032-11ee-b339-0242ac110002",
                "is_correct": false,
                "choice_value": "1",
                "clue": "single is not right"
            },
            {
                "choice_id": "09da69c6-1032-11ee-b339-0242ac110002",
                "question_fk": "09d8f000-1032-11ee-b339-0242ac110002",
                "is_correct": false,
                "choice_value": "0",
                "clue": "nothingness is not an option"
            },
            {
                "choice_id": "09da6a16-1032-11ee-b339-0242ac110002",
                "question_fk": "09d8f000-1032-11ee-b339-0242ac110002",
                "is_correct": true,
                "choice_value": "3",
                "clue": "third time is a charm"
            },
            {
                "choice_id": "09da6a66-1032-11ee-b339-0242ac110002",
                "question_fk": "09d8f000-1032-11ee-b339-0242ac110002",
                "is_correct": false,
                "choice_value": "4",
                "clue": "quad is an offroad vehicle"
            }
        ]
    },
    {
        "game_fk": "7d9c5730-0d8e-11ee-b8cb-0242ac110002",
        "question_fk": "7d9aaba6-0d8e-11ee-b8cb-0242ac110002",
        "current_section": 1,
        "section_index": 3,
        "question": {
            "que_value": "3 + 1",
            "que_answer": "4",
            "category": "general",
            "asked_by": "7d97756c-0d8e-11ee-b8cb-0242ac110002",
            "has_choices": false,
            "max_points": 5000
        },
    },
    {
        "game_fk": "7d9c5730-0d8e-11ee-b8cb-0242ac110002",
        "question_fk": "7d9aac32-0d8e-11ee-b8cb-0242ac110002",
        "current_section": 1,
        "section_index": 4,
        "question": {
            "que_value": "4 + 1",
            "que_answer": "5",
            "category": "general",
            "asked_by": "7d97756c-0d8e-11ee-b8cb-0242ac110002",
            "has_choices": false,
            "has_clues": false,
            "max_points": 5000
        }
    },
    {
        "game_fk": "7d9c5730-0d8e-11ee-b8cb-0242ac110002",
        "question_fk": "7d9aac64-0d8e-11ee-b8cb-0242ac110002",
        "current_section": 1,
        "section_index": 5,
        "question": {
            "que_value": "5 + 1",
            "que_answer": "6",
            "category": "general",
            "asked_by": "7d97756c-0d8e-11ee-b8cb-0242ac110002",
            "has_choices": false,
            "has_clues": false,
            "max_points": 5000
        }
    }
]