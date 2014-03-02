---
title: Ruby_Perl_Rosetta_Stone
createdAt: 2014-03-02T14:45-05:00
editedAt: 2014-03-02T14:45-05:00
---

A map from Ruby to Perl tools, narrowed to ones that I use or recommend.

|| Thing                                                    || Ruby            || Perl                                        ||
|| Normalize/Layer HTTP request chain from app to webserver || Rack            || Plack/PSGI                                  ||
|| Preforking webserver                                     || unicorn         || starman                                     ||
|| Nonblocking-IO webserver                                 || thin            || twiggy                                      ||
|| Full web MVC stack                                       || Rails           || Catalyst                                    ||
|| Lightweight RESTful stack                                || Sinatra         || Dancer, Mojolicious                         ||
|| Package/dependency installer                             || gem             || cpanm                                       ||
|| Dependency tracker                                       || bundler         || carton                                      ||
|| Event-driven architecture, async-IO                      || EventMachine    || AnyEvent, IO::Async                         ||
|| Common templating                                        || erb, haml       || Template::Toolkit, Text::HAML               ||
|| Testing framework                                        || rspec, cucumber || Test::More, Test::Spec, Test::TDD::Cucumber ||
|| REPL                                                     || Pry             || Devel::REPL                                 ||


