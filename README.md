# 🌬️ Vike View Transitions

![gif](./view-transitions-vike.gif)

Tutorial/Demonstration on how to easily do View Transitions in Vike (mainly focusing on **cross-page transitions** since that generally requires the client-side router framework being used).

That means performing Page Transitions in NextJS is unique (which is surprisingly hard) vs Vike (which is actually extremely easy!).

## 2-step Tutorial

1. **Indicate what to Morph across pages.**

```tsx
// Page 1.

<img style={{ viewTransitionName: 'image-1' }} />

// Page 2

<div style={{ viewTransitionName: 'image-1' }}><img /></div>
```

2. **Perform Navigation:**

The key here is using the `navigate()` function from `vike/client/router`. ([See 'Explanation' why](#explanatio)). Afaik, you can't use anything else.

- 2.1. With `<button>` this is extremely straightforward:

  ```tsx
  <button
    onClick={() => {
      if (document.startViewTransition)
        document.startViewTransition(async () => {
          await navigate("/image-1"); // Make sure to await.
        });
    }}
  >
    Go to Page
  </button>
  ```

  ⚠️ The only thing that sucks with button is **browser anchor tag accessibility** (you can't middle-click to open in new tab OR right-click to see the context-menu). So you might want to keep it an anchor tag instead 👇.

- 2.2 With `<a>` - just a teensy bit more code just to keep it accessible, but I can explain:

  ```tsx
  <a
    href="/image-1" // Technically doesn't matter, onClick. But will matter for middle click and right click.
    onClick={(e) => {
      // So first, we need to "stop" other interceptors (i.e. Vike's client-side router interceptor for the anchor tag).
      e.stopPropagation();

      // Second, we prevent the default behavior of the anchor tag.
      // That means href technically won't work. (Which is good, so we can use `navigate()` instead).
      e.preventDefault();

      // Finally, start the view transition and call navigate inside the callback!
      if (document.startViewTransition)
        document.startViewTransition(async () => {
          await navigate("/image-1"); // Make sure to await. Make sure it's the same as href.
        });
    }}
  >
    Go to Page
  </a>
  ```

## Explanation

Your first thought may be to use [`+onPageTransitionStart`](https://vike.dev/onPageTransitionStart) or [`+onPageTransitionEnd`](https://vike.dev/onPageTransitionEnd). You may think that adding `document.startViewTransition()` in that Vike hook would work,
but since the order of logic behind view transitions is "Start view transition, take a screenshot of current page, load new page, take a second screenshot, apply transition".
This won't work because the "load new page" essentially MUST HAPPEN inside the startViewTransition callback.

So the magic of view transitions lies with the `navigate()` function from `vike/client/router`.

Second, you might be asking, _"Why do I need to override the `<a>` tag's default behavior and propagation?"_. The `<a>` by itself is kind of bad for two reasons:

- [Vike's client-side router interceptor](https://github.com/vikejs/vike/blob/81afe1fea7c84791ae634c9514029cf3fb5e53c0/vike/client/client-routing-runtime/initOnLinkClick.ts#L8) - Although the default **client-side navigations** are snappy and convenient, we don't have control of when the navigation starts and ends. For view transitions, we need complete knowledge for when a change from A to B has happened and ended. You WILL get inconsistent transitions if you don't override it. Hence we do `e.stopPropagation()` and use `navigate()` instead.
- Once we disable the client-side router via stopProgation, the `<a>` tag will now perform MPA navigations (which is kinda unintuitive if you chose Vike, Astro is much better at this), you can see this if the DevTools Network request tab responds with HTML instead of JSON when doing navigations. Hence we also `e.preventDefault()`.

🎉 Huge props to the Vike team for a well-crafted API for `navigate()` to support view transitions!
