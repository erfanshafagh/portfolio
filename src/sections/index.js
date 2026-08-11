/**
 * Section registry.
 *
 * Maps a section id from data.js to its renderer. Adding a new *kind* of
 * section means adding a module here and one entry in `data.sections`; nothing
 * in main.js, index.html or the stylesheets needs to change.
 *
 * Each module exports:
 *   render(data) -> string   required, returns the panel's inner markup
 *   mount(panel, data)       optional, wires listeners exactly once
 */

import * as about from "./about.js";
import * as education from "./education.js";
import * as experience from "./experience.js";
import * as projects from "./projects.js";
import * as skills from "./skills.js";
import * as publications from "./publications.js";
import * as contact from "./contact.js";

export const SECTIONS = { about, education, experience, projects, skills, publications, contact };

/**
 * The sections that should actually appear: declared in data, backed by a
 * renderer, and holding content.
 */
export function activeSections(data) {
  return (data.sections ?? []).filter((s) => {
    if (!SECTIONS[s.id]) {
      console.warn(`[portfolio] no renderer for section "${s.id}" — skipping`);
      return false;
    }
    if (data[s.id]?.display === false) return false;
    const content = data[s.id];
    return !Array.isArray(content) || content.length > 0;
  });
}
