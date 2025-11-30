CREATE TABLE "cvs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" text NOT NULL,
	"cv_type" text NOT NULL,
	"template_id" text,
	"content" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"is_favorite" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_accessed_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "cv_type_check" CHECK ("cvs"."cv_type" IN ('ats', 'custom', 'skill-based')),
	CONSTRAINT "title_length" CHECK (char_length("cvs"."title") >= 1 AND char_length("cvs"."title") <= 200)
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"avatar_seed" text DEFAULT gen_random_uuid()::text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "full_name_length" CHECK (char_length("profiles"."full_name") >= 2 AND char_length("profiles"."full_name") <= 100)
);
