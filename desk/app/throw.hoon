::  throw: an unresponsive yo-yo trick guide and trainer.
::  owner-only json api under /apps/throw/api:
::
::    GET    /state            progress, sessions, settings
::    POST   /trick/<id>       {status, note}   status: new learning landed solid
::    POST   /session          {kind, at?, secs, note?, reps: [{trick, lands, misses, streak}]}
::    DELETE /session/<id>
::    POST   /settings         any json up to 8 kB
::
::    kind is 'train' or 'ladder'; at is unix ms
::
/+  default-agent, dbug, server
|%
+$  prog     [status=@t note=@t at=@da]
+$  rep      [trick=@t lands=@ud misses=@ud streak=@ud]
+$  session  [id=@ud kind=@t at=@da secs=@ud note=@t reps=(list rep)]
+$  versioned-state  $%(state-0)
::  sessions: newest first
+$  state-0
  $:  %0
      next=@ud
      progress=(map @t prog)
      sessions=(list session)
      settings=(unit @t)
  ==
+$  card  card:agent:gall
--
::
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
=<
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %|) bowl)
    hc    ~(. +> bowl)
++  on-init
  ^-  (quip card _this)
  :_  this
  [%pass /eyre/connect %arvo %e %connect [~ /apps/throw] dap.bowl]~
++  on-save  !>(state)
++  on-load  |=(old=vase `this(state !<(versioned-state old)))
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?.  ?=(%handle-http-request mark)  (on-poke:def mark vase)
  =+  !<([eyre-id=@ta req=inbound-request:eyre] vase)
  =^  cards  state  (handle:hc eyre-id req)
  [cards this]
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?:  ?=([%http-response @ ~] path)  `this
  (on-watch:def path)
++  on-arvo
  |=  [=wire =sign-arvo]
  ^-  (quip card _this)
  ?.  ?=([%eyre %connect ~] wire)  (on-arvo:def wire sign-arvo)
  `this
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+  path  (on-peek:def path)
    [%x %progress ~]  ``noun+!>(progress)
    [%x %sessions ~]  ``noun+!>(sessions)
  ==
++  on-agent  on-agent:def
++  on-leave  on-leave:def
++  on-fail   on-fail:def
--
::
|_  =bowl:gall
++  statuses  `(list @t)`~['new' 'learning' 'landed' 'solid']
++  handle
  |=  [eyre-id=@ta req=inbound-request:eyre]
  ^-  (quip card state-0)
  =/  give  (cury give-simple-payload:app:server eyre-id)
  ?.  authenticated.req
    =/  rl  (parse-request-line:server url.request.req)
    ?:  ?=([%apps %throw %api *] site.rl)  [(give [[403 ~] ~]) state]
    [(give (login-redirect:gen:server request.req)) state]
  =/  site=(list @t)
    =/  s  site:(parse-request-line:server url.request.req)
    ?.(?=([%apps %throw *] s) ~ t.t.s)
  =*  method  method.request.req
  =/  jon=(unit json)
    ?~  body.request.req  ~
    (de:json:html q.u.body.request.req)
  ?+    site  [(give not-found:gen:server) state]
      ~           [(give (ok 'text/html' (file /web/index/html))) state]
      [%$ ~]      [(give (ok 'text/html' (file /web/index/html))) state]
      [%app ~]    [(give (ok 'text/javascript' (file /web/app/js))) state]
      [%data ~]   [(give (ok 'text/javascript' (file /web/data/js))) state]
      [%style ~]  [(give (ok 'text/css' (file /web/style/css))) state]
      [%icon ~]   [(give (ok 'image/png' (file /web/icon/png))) state]
      [%icon-512 ~]  [(give (ok 'image/png' (file /web/icon-512/png))) state]
      [%manifest ~]  [(give (ok 'application/manifest+json' (as-octs:mimes:html (en:json:html manifest)))) state]
  ::
      [%api %state ~]
    [(give (json-response:gen:server state-json)) state]
  ::
      [%api %trick @ ~]
    ?.  ?=(%'POST' method)  [(give [[405 ~] ~]) state]
    =*  id  i.t.t.site
    ?:  (gth (met 3 id) 64)  [(give [[400 ~] ~]) state]
    =/  status  ?~(jon ~ (str (field u.jon 'status')))
    ?.  &(?=(^ status) ?=(^ (find ~[u.status] statuses)))
      [(give [[400 ~] ~]) state]
    =/  note  (fall ?~(jon ~ (str (field u.jon 'note'))) '')
    ?:  (gth (met 3 note) 4.000)  [(give [[400 ~] ~]) state]
    ?:  &(=('new' u.status) =('' note))
      [(give [[204 ~] ~]) state(progress (~(del by progress) id))]
    [(give [[204 ~] ~]) state(progress (~(put by progress) id [u.status note now.bowl]))]
  ::
      [%api %session ~]
    ?.  ?=(%'POST' method)  [(give [[405 ~] ~]) state]
    =/  s  ?~(jon ~ (parse-session u.jon))
    ?~  s  [(give [[400 ~] ~]) state]
    =/  new=session  u.s(id next)
    =/  all  (sort [new sessions] |=([a=session b=session] (gth at.a at.b)))
    :-  (give (json-response:gen:server (session-json new)))
    state(next +(next), sessions all)
  ::
      [%api %session @ ~]
    =/  id  (rush i.t.t.site dem)
    ?.  &(?=(^ id) ?=(%'DELETE' method))  [(give [[400 ~] ~]) state]
    [(give [[204 ~] ~]) state(sessions (skip sessions |=(s=session =(id.s u.id))))]
  ::
      [%api %settings ~]
    ?.  ?=(%'POST' method)  [(give [[405 ~] ~]) state]
    ?~  body.request.req  [(give [[400 ~] ~]) state]
    ?.  &(?=(^ jon) (lte p.u.body.request.req 8.192))  [(give [[400 ~] ~]) state]
    [(give [[204 ~] ~]) state(settings `q.u.body.request.req)]
  ==
::
++  ok
  |=  [type=@t =octs]
  ^-  simple-payload:http
  [[200 ['content-type' type]~] `octs]
++  file
  |=  =path
  ^-  octs
  (as-octs:mimes:html .^(@t %cx (weld /(scot %p our.bowl)/[q.byk.bowl]/(scot %da now.bowl) path)))
::
++  manifest
  ^-  json
  =,  enjs:format
  =/  icon
    |=  [src=@t size=@t]
    (pairs ~[src+s+src sizes+s+size type+s+'image/png' purpose+s+'any maskable'])
  %-  pairs
  :~  name+s+'Throw'
      ['short_name' s+'Throw']
      ['start_url' s+'/apps/throw']
      scope+s+'/apps/throw'
      display+s+'standalone'
      ['background_color' s+'#101014']
      ['theme_color' s+'#101014']
      icons+a+~[(icon '/apps/throw/icon' '256x256') (icon '/apps/throw/icon-512' '512x512')]
  ==
::
::  json in
::
++  field
  |=  [j=json k=@t]
  ^-  json
  ?.  ?=([%o *] j)  ~
  (fall (~(get by p.j) k) ~)
++  num
  |=  j=json
  ^-  (unit @ud)
  ?.  ?=([%n *] j)  ~
  (rush p.j dem)
++  str
  |=  j=json
  ^-  (unit @t)
  ?.(?=([%s *] j) ~ `p.j)
++  at-of
  |=  j=json
  ^-  @da
  =/  ms  (num (field j 'at'))
  ?~  ms  now.bowl
  (add ~1970.1.1 (div (mul u.ms ~s1) 1.000))
::
++  parse-session
  |=  j=json
  ^-  (unit session)
  =/  kind  (str (field j 'kind'))
  ?.  &(?=(^ kind) |(=('train' u.kind) =('ladder' u.kind)))  ~
  =/  secs  (fall (num (field j 'secs')) 0)
  =/  note  (fall (str (field j 'note')) '')
  ?:  (gth (met 3 note) 2.000)  ~
  =/  rs  (field j 'reps')
  ?.  ?=([%a *] rs)  ~
  ?:  (gth (lent p.rs) 200)  ~
  =/  reps=(list rep)
    %+  murn  p.rs
    |=  r=json
    =/  t  (str (field r 'trick'))
    ?~  t  ~
    ?:  (gth (met 3 u.t) 64)  ~
    =/  l  (fall (num (field r 'lands')) 0)
    =/  m  (fall (num (field r 'misses')) 0)
    =/  s  (fall (num (field r 'streak')) 0)
    ?.  &((lte l 10.000) (lte m 10.000) (lte s l))  ~
    `[u.t l m s]
  ?~  reps  ~
  `[0 u.kind (at-of j) (min secs 86.400) note reps]
::
::  json out
::
++  session-json
  |=  s=session
  ^-  json
  =,  enjs:format
  %-  pairs
  :~  id+(numb id.s)
      kind+s+kind.s
      at+(time at.s)
      secs+(numb secs.s)
      note+s+note.s
      :-  %reps
      :-  %a
      %+  turn  reps.s
      |=  r=rep
      %-  pairs
      :~  trick+s+trick.r
          lands+(numb lands.r)
          misses+(numb misses.r)
          streak+(numb streak.r)
      ==
  ==
++  state-json
  ^-  json
  =,  enjs:format
  %-  pairs
  :~  ship+s+(scot %p our.bowl)
    ::
      :-  %progress
      %-  pairs
      %+  turn  ~(tap by progress)
      |=  [k=@t p=prog]
      [k (pairs ~[status+s+status.p note+s+note.p at+(time at.p)])]
    ::
      sessions+a+(turn sessions session-json)
      settings+?~(settings ~ (need (de:json:html u.settings)))
  ==
--
