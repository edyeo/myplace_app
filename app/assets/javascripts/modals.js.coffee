($ "a[data-toggle=modal]").click ->
  target = ($ @).attr('data-target')
  url = ($ @).attr('href')
  ($ target).load(url)


