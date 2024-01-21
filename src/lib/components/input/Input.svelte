<script>
  import {browser} from "$app/environment";

  export let disabled = false;
  let className = "";
  // noinspection ReservedWordAsName
  export {className as class};

  /** @type {string} */
  export let label;
  /** @type {string | undefined | null} */
  export let hint = "";
  /** @type {string | undefined | null} */
  export let error = "";
  /** @type {boolean | "background"} */
  export let outlined = false;
  export let textarea = false;
  export let style = "";
  export let noScroller = false;
  export let hideLabel = false;
  export let placeholder = "";

  let focused = false;
  export let value = "";

  /** @type {FileList | null} */
  export let files = null;

  let hintHeight = (error || hint) ? 25 : 3;
  $: spacerHeight = browser ? (hintHeight === 3 ? 3 : hintHeight + 5) : (error || hint) ? 30 : 3;

  // TODO: Rewrite this to Tailwind
</script>

<div class:wrapper={true} class={className} {style}>
  <label
    class:field={true}
    class:disabled
    class:focused={focused && !disabled}
    class:full-label={!placeholder && !value && !focused && !["file", "datetime-local"].includes($$restProps.type)}
    class:outlined
    class:background={outlined === "background"}
    class:textarea
    class:file={$$restProps.type === "file"}
  >
    {#if $$slots.icon}
      <span class="field-icon">
        <slot name="icon" />
      </span>
    {/if}
    <span class="field-inner">
      <span class="field-label" class:browser class:hideLabel>
        {label}
      </span>
      {#if !textarea && $$restProps.type !== "file"}
        <input
          class="field-input"
          class:noScroller
          on:focus={() => focused = true}
          on:blur={() => focused = false}
          on:input
          bind:value
          {placeholder}
          {disabled}
          {...$$restProps}
        />
      {:else if !textarea &&$$restProps.type === "file"}
        <input
          class="field-input"
          on:focus={() => focused = true}
          on:blur={() => focused = false}
          on:input
          bind:value
          bind:files
          {placeholder}
          {disabled}
          {...$$restProps}
          type="file"
        />
      {:else}
        <textarea
          class="field-input"
          on:focus={() => focused = true}
          on:blur={() => focused = false}
          on:input
          bind:value
          {disabled}
          {...$$restProps}
        ></textarea>
        <div class="field-ghost">
          {#each (value || " ").split("\n") as line}
            {line}<br>
          {/each}
        </div>
      {/if}
    </span>
  </label>
  <div class="field-hint" class:error class:visible={error || hint} bind:clientHeight={hintHeight}>
    {error || hint}
  </div>
  <div class="field-hint-spacer"
       class:visible={error || hint}
       style="height: {spacerHeight}px;"></div>
</div>

<style lang="scss">
  .wrapper {
    width: 100%;
    position: relative;
  }

  .field {
    background-color: rgb(var(--background-200));
    display: flex;
    align-items: center;
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
    width: 100%;
    cursor: text;
    transition: outline-width 200ms ease;
    outline: rgb(var(--text-800)) solid 0;
    height: 3.2rem;
  }
  .field.outlined {
    background-color: transparent;
    border: 0.1rem solid rgb(var(--background-200));
    outline: none;
    transition: border 200ms ease;
    height: 3rem;
  }
  .focused {
    outline-width: 0.1rem;
  }
  .outlined.focused {
    border-color: rgb(var(--text-900));
  }
  .disabled {
    background-color: rgb(var(--background-200));
  }

  .field.textarea {
    height: initial;
  }

  .field-icon {
    width: 1.7rem;
    height: 1.7rem;
    flex-shrink: 0;
    margin-right: 0.5rem;
  }
  .outlined .field-icon {
    transition: color 200ms ease;
    color: rgb(var(--text-800));
  }
  .outlined.focused .field-icon {
    color: rgb(var(--text-900));
  }
  .disabled > .field-icon {
    color: rgb(var(--text-800));
  }

  .field-inner {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .field-label {
    font-weight: 400;
    font-size: 0.9rem;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 200ms ease;
    color: rgb(var(--text-900));
    user-select: none;
  }
  .outlined .field-label {
    top: -0.75rem;
    background-color: rgb(var(--background-200));
    padding: 0 0.25rem;
  }
  .outlined.background .field-label {
    background-color: rgb(var(--background-950));
  }
  .full-label .field-label.browser {
    font-size: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgb(var(--text-800));
  }
  .field-label.hideLabel, .full-label .field-label.hideLabel {
    font-size: 0;
  }

  .field-input {
    background-color: transparent;
    border: none;
    color: rgb(var(--text-900));
    outline: none;
    font-size: 1.2rem;
    flex-grow: 1;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .file .field-input {
    font-size: 0.9rem;
  }
  .outlined .field-input {
    top: 50%;
    transform: translateY(-50%);
    height: 100%;
  }
  .disabled .field-input {
    color: rgb(var(--text-800));
    background-color: rgb(var(--background-200));
  }
  .field-input:focus {
    /* to silence the a11y inspector */
    background-color: transparent;
  }
  textarea.field-input, .outlined textarea.field-input {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    transform: none;
    padding: 0.5rem 0.25rem 0.25rem;
    resize: none;
    z-index: 10;
  }
  .field-input.noScroller {
    -moz-appearance: textfield;
    appearance: textfield;
  }
  .field-input.noScroller::-webkit-outer-spin-button,
  .field-input.noScroller::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .field-ghost {
    font-size: 1.2rem;
    z-index: 0;
    padding: 0.5rem 0.25rem 0.25rem;
    color: transparent;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    user-select: none;
  }

  .field-hint {
    position: absolute;
    padding: 0.2rem 0.5rem 0;
    font-size: 1rem;
    opacity: 0;
    transition: opacity 200ms ease;
    color: rgb(var(--text-800));
  }
  .field-hint.visible {
    opacity: 0.75;
  }
  .field-hint.error.visible {
    color: rgb(var(--accent-800));
    opacity: 1;
  }

  .field-hint-spacer {
    transition: height 200ms ease;
  }
</style>
