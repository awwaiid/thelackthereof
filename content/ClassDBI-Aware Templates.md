---
title: ClassDBI-Aware_Templates
tags: []
createdAt: 2005-04-05T01:59-04:00
updatedAt: 2005-04-24T15:18-04:00
---

So this is along the lines of delphi (and other system's) data-aware controls. The idea is to intwine cpan:Class::DBI objects with a template.

```
  $person = DB::Person('joe');
  $tpl = new Template('personView.tpl');
  $tpl->intwine(person => \$person);
  $tpl->render(
    title => 'This is the title of the page!'
  # ...
```
    

