CREATE TABLE IF NOT EXISTS "requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"model" varchar(255) NOT NULL,
	"prompt" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"payload" json NOT NULL,
	"response" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
