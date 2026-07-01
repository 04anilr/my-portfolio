-- ============================================================
--  BLOGS TABLE  —  run this in the Supabase SQL Editor
-- ============================================================
-- Stores blog posts written from the portfolio admin panel
-- (route: #/blog-admin) and displayed in the "Blogs" section.
-- ------------------------------------------------------------

create table if not exists public.blogs (
  id            uuid          primary key default gen_random_uuid(),
  title         text          not null,
  slug          text          unique,
  excerpt       text,                              -- short summary shown on the card
  content       text          not null,            -- full post body (markdown / plain text)
  cover_image   text,                              -- public image URL (optional)
  tags          text[]        not null default '{}',
  author        text          not null default 'Anil Rajput',
  reading_time  int,                               -- minutes (auto-estimated on insert)
  published     boolean       not null default true,
  created_at    timestamptz   not null default now(),
  updated_at    timestamptz   not null default now()
);

-- Keep the newest posts easy to query
create index if not exists blogs_created_at_idx on public.blogs (created_at desc);
create index if not exists blogs_published_idx  on public.blogs (published);

-- Auto-update `updated_at` on every edit
create or replace function public.set_blogs_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_blogs_updated_at on public.blogs;
create trigger trg_blogs_updated_at
  before update on public.blogs
  for each row execute function public.set_blogs_updated_at();

-- ============================================================
--  AUTHORIZATION  (anonymous-write model — mirrors the Library)
-- ============================================================
-- The portfolio talks to Supabase with the publishable (anon) key
-- and has NO auth session, so every request runs as the anon role.
-- The existing, working `portfolio_documents` (Library) table runs
-- with RLS DISABLED, which is why anon inserts succeed there.
-- We deliberately match that proven setup for `blogs`.
--
-- Why not RLS policies? Under the new `sb_publishable_...` API key,
-- enabling RLS + `to anon` policies was still returning 401 / 42501
-- for this project, whereas the RLS-disabled Library table works.
-- Matching the Library is the reliable, consistent fix.
--
-- SECURITY NOTE: with RLS disabled the table is writable by anyone
-- holding the public anon key (visible in the browser). That is an
-- explicit choice for this personal admin panel, identical to the
-- Library. To lock writes down later, switch to Supabase Auth and
-- re-enable RLS with `to authenticated` write policies.

alter table public.blogs disable row level security;

-- Table-level privileges for the anon/authenticated roles.
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.blogs to anon, authenticated;

-- Make PostgREST pick up the table/grants immediately.
notify pgrst, 'reload schema';

-- ============================================================
--  EXAMPLE: insert a blog post manually
-- ============================================================
-- insert into public.blogs (title, slug, excerpt, content, cover_image, tags, reading_time)
-- values (
--   'Getting Started with React',
--   'getting-started-with-react',
--   'A quick intro to building UIs with React components and hooks.',
--   'React is a JavaScript library for building user interfaces...',
--   'https://example.com/cover.png',
--   array['react', 'javascript', 'frontend'],
--   4
-- );
