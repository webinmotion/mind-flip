docker run -d \
	--name mind-flip-postgres \
	--network pgnetwork \
	-e POSTGRES_PASSWORD=postgres \
	-e PGDATA=/var/lib/postgresql/data/pgdata \
	-v ~/.pgdata:/var/lib/postgresql/data \
	-p 5432:5432 \
	mind-flip-postgres