---
title: DOM_Templates_and_AJAX
createdAt: 2005-07-19T19:13-04:00
editedAt: 2005-07-19T19:15-04:00
---


Part of the new Javascript craze is a combination of two things:
# XmlHttpGet - fetch XML/HTML in the background
# Manipulate the DOM, using the above XML get to infuse new data onto the currently views page

The combination means that small parts of the screen can be updated without doing a full refresh, creating a smoother user experience. There are issues using this technique, however. The one which is already coming up is use of the 'back' button, though that is an issue for web application programming in general. Another is having two codebases -- one which uses this technique on new browsers and one which always uses full-page refreshes for older browsers.

I've worked out a technique which will allow us to keep this feature and degrade and keep the back button. To do this you need an intelligent templating engine (server-side), which I call the Infusor. The infusor starts with a template as a base, and then infuses DOM changes provided by the rest of your program. The infusor is aware of the context of the request, and whether the browser is expecting a full page or just DOM updates.

Correspondingly, there is a bit of javascript running on the client which passes extra parameters to the script letting it know to return just DOM changes, and then accepts and incorporates those DOM changes. The js is installed only on browsers which can handle the whole featurset required.

If the client, for example, turns off javascript in the middle of a session with the application there is no issue. The Infusor does not get the extra parameter requestiong DOM changes and instead sends the entire content. Like magic we degrade gracefully. The same is true if javascript is off and then suddenly gets turned on again.

As to the back button -- we take a page from continuation-based web programming here. Each output gets a unique page ID. If the infusor is asked to output the same page ID a second time, it sends the entire page instead of the DOM update.

<graph>
digraph {
  Template -> Infusor;
  Infusor -> "Client Web Browser";
  "Client Web Browser" -> "Processing Loop";
  "Processing Loop" -> Infusor;
}
</graph>

