create table if not exists public.visitor_sessions (
  session_id uuid primary key,
  last_seen timestamptz not null default pg_catalog.now()
);

create index if not exists visitor_sessions_last_seen_idx
  on public.visitor_sessions (last_seen);

alter table public.visitor_sessions enable row level security;
revoke all on table public.visitor_sessions from anon, authenticated;

create or replace function public.heartbeat_visitor(p_session_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.visitor_sessions (session_id, last_seen)
  values (p_session_id, pg_catalog.now())
  on conflict (session_id)
  do update set last_seen = excluded.last_seen;

  delete from public.visitor_sessions
  where last_seen < pg_catalog.now() - interval '1 day';
end;
$$;

revoke all on function public.heartbeat_visitor(uuid) from public, anon, authenticated;
grant execute on function public.heartbeat_visitor(uuid) to anon, authenticated;

create or replace function public.count_active_visitors()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  active_count integer;
begin
  if lower(coalesce(auth.jwt() ->> 'email', '')) <> 'shahd.soliman2050@gmail.com' then
    raise exception 'Not authorized';
  end if;

  select count(*)::integer
  into active_count
  from public.visitor_sessions
  where last_seen >= pg_catalog.now() - interval '90 seconds';

  return coalesce(active_count, 0);
end;
$$;

revoke all on function public.count_active_visitors() from public, anon, authenticated;
grant execute on function public.count_active_visitors() to authenticated;
