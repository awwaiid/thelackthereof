---
title: Mathematical_Markup
tags: []
createdAt: 2004-06-18T06:26-04:00
updatedAt: 2011-04-26T02:56-04:00
---

There's something wrong here - all mathematics is blacked out, as it too the page header.


I've taught this wiki to use LaTeX for mathematical markup, using [http://www.mathjax.org/|MathJax], a Javascript library for rendering mathematical markup.

(Previously I used the [http://www.oddmuse.org/cgi-bin/oddmuse/LaTeX_Extension LaTeX module extension] for OddMuse. But that requires LaTeX be installed and some other messyness, generating images as the output. MathJax is better -- it requires Javascript, but gives lovely copy-pasteable equations).

You simply wrap your math like this: $ $ x^2 $ $ to get something like $$x^2$$. Or, you could wrap your math with \ ( x^2 \ ) to get an inline equation, \( x^2 \). This page is to document some of the ways this can be used. Please choose 'Edit text of this page' at the bottom to play!

We can do nifty integrals, like: $$ \int^{\infty}_{0}{x^8} $$ Heck, we can even do summations such as: $$ \sum _{i=0} ^{\infty+2} x^2 + 3i $$ Fun, eh?  For limits we can do: $$ \lim_{x \rightarrow 0} x^3=0 $$

Fractions are done like this: \( \frac{x^6}{\sqrt{3x}} \) or this: \( {dy\over dx} \)

|| \Gamma  || $$\Gamma$$  || \Delta  || $$\Delta$$  ||
|| \Lambda || $$\Lambda$$ || \Phi    || $$\Phi$$    ||
|| \Pi     || $$\Pi$$     || \Psi    || $$\Psi$$    ||

More symbols - $$ \Sigma \Theta \Upsilon \Xi \Omega \alpha \beta \gamma \delta \epsilon \zeta \eta \theta \iota \kappa \lambda \mu \nu \xi \pi \rho \sigma \tau \upsilon \phi \chi \psi \omega $$

$$e^{i\pi}=-1$$

$$x_2^3$$

$$\left(\begin{array}{cc} 1 & 0 \\ 0 & \phi\\ \end{array}\right)$$

----

Some special things like \( \mathcal{P} \) and \(\mathbb{R}\) work, but I might have to turn on some more stuff from MathJax for other things.

----

$$\nabla\cdot\vec{B}=0$$

----

$$\sigma_{xz}^{i-\frac{1}{2},j-\frac{1}{2}}=\mu^{i-\frac{1}{2},j-\frac{1}{2}}(\frac{\partial u_x^{i-\frac{1}{2},j-\frac{1}{2}}}{\partial z}+\frac{\partial u_z^{i-\frac{1}{2},j-\frac{1}{2}}}{\partial x})$$

----

Testing...

$$\sum_{i \in J}x^i$$


