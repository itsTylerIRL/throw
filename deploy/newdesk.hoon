=/  m  (strand ,vase)
;<  =bowl:spider  bind:m  get-bowl
=/  our  (scot %p our.bowl)
=/  now  (scot %da now.bowl)
?:  (~(has in .^((set desk) %cd /[our]/$/[now])) %throw)
  (pure:m !>('throw desk already exists; not touching it'))
=/  files=(list path)
  :~  /mar/noun/hoon  /mar/hoon/hoon  /mar/txt/hoon  /mar/kelvin/hoon  /sys/kelvin
      /mar/bill/hoon  /mar/mime/hoon  /mar/json/hoon
      /lib/skeleton/hoon  /lib/default-agent/hoon  /lib/dbug/hoon
  ==
=/  pages=(map path page:clay)
  %-  ~(gas by *(map path page:clay))
  %+  turn  files
  |=  p=path
  [p [(rear p) .^(* %cx (weld /[our]/base/[now] p))]]
;<  ~  bind:m  (poke-our %hood %helm-pass !>((new-desk:cloy %throw ~ pages)))
(pure:m !>('created %throw'))
