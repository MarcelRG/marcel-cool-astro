# <a href="www.marcelrg.com">www.marcelrg.com</a>

<a href="www.marcelrg.com"><img href="www.marcelrg.com" src="/public/images/m.webp" alt="M logo"></a>

## A new personal website.

### Post Link: <a href="www.marcelrg.com/project/marcelcool">www.marcelrg.com/project/marcelcool</a>
### Notable features:

- Great lighthouse scores
- Cool tailwind hover animations
- Pin 3 projects and blogs to show in homescreen
- Music playlist you can listen to while navigating

I decided to update my personal website for three main reasons:

1. Finally get around building a blog, not just a project showcase.
2. Incorporate modern design trends with some animations.
3. Try out new tech.

Figma low fidelity design:
![figmaMarcelcool](/public/images/figmaMarcelcool.webp)

Goals I had for this new website:

- Fast load times in dev and production
- Good blog writting experience using markdown
- Flexible enough to fit my cool and sometimes wacky designs

With those goals in mind, I figured that it might be a good idea to build this new website using astro and tailwind.

## Tech Review

### Astro

Love at first sight. It's just so quick to setup everything up, incredible fast and adaptable to multiple frontend tools.
Will definetly be using it again in case I need to build another blog or some other type of documentation.

### Tailwind

I won't lie, I thought I was going to hate it. The idea of inline styling felt weird early on.
Like something you just shouldn't do. But the more I used it, the more it grew on me.
The speed at which I was able to translate my figma designs to code truly impressed me.

I thought about adding more fancy 3D animations using three.js or greensock.
Even went so far as to do some 3D renders on spline, check them out:

![3DM](/public/images/3DM.gif)

Buuut I decided to keep it simple, since I didn't want to impact load times.
In the end, tailwind's animation utilites where fine for most of what I needed.

### Features that would be cool to implement latter:

- astrojs/images: To automatically optimize images based on squoosh
- astro islands: To add fancy UI components while not impacting performance
- Automate SEO.
- Filter by blog tags.
