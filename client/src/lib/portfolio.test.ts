import { describe, expect, it } from "vitest";
import { getMailtoHref, getVisibleProjects, isQuickNavShortcut, navItems, projects, skillGroups, socialLinks, toggleProjectId } from "./portfolio";

describe("portfolio content model", () => {
  it("contains the four resume-backed case studies", () => {
    expect(projects.map((project) => project.id)).toEqual(["uav", "distilbert", "mindvault", "aura"]);
    expect(projects.every((project) => project.summary.length > 60)).toBe(true);
    expect(projects.every((project) => project.architecture.length > 80)).toBe(true);
  });

  it("keeps evidence-based metrics tied to the resume", () => {
    const distilbert = projects.find((project) => project.id === "distilbert");
    expect(distilbert?.metrics).toEqual([
      { label: "Compression", value: "40% smaller" },
      { label: "Retention", value: "95%+ performance" },
    ]);
    const mindvault = projects.find((project) => project.id === "mindvault");
    expect(mindvault?.metrics.some((metric) => metric.value === "On-device")).toBe(true);
  });

  it("does not invent a LinkedIn destination", () => {
    expect(socialLinks.linkedin).toBe("");
    expect(socialLinks.github).toBe("https://github.com/sahilgaikwad94");
  });

  it("exposes navigable skill groups and section anchors", () => {
    expect(skillGroups).toHaveLength(4);
    expect(skillGroups.every((group) => group.skills.length >= 10)).toBe(true);
    expect(navItems.map((item) => item.href)).toEqual(["#signal", "#work", "#stack", "#contact"]);
  });
});

describe("portfolio interaction helpers", () => {
  it("filters case studies by category and returns all for the default view", () => {
    expect(getVisibleProjects("All")).toHaveLength(4);
    expect(getVisibleProjects("Systems").map((project) => project.id)).toEqual(["uav", "aura"]);
    expect(getVisibleProjects("AI / ML").map((project) => project.id)).toEqual(["distilbert"]);
  });

  it("opens and closes the same project id predictably", () => {
    expect(toggleProjectId(null, "uav")).toBe("uav");
    expect(toggleProjectId("uav", "uav")).toBeNull();
    expect(toggleProjectId("uav", "aura")).toBe("aura");
  });

  it("recognizes keyboard quick navigation shortcuts", () => {
    expect(isQuickNavShortcut("/", true, false)).toBe(true);
    expect(isQuickNavShortcut("k", false, true)).toBe(true);
    expect(isQuickNavShortcut("k", false, false)).toBe(false);
    expect(isQuickNavShortcut("Escape", true, true)).toBe(false);
  });

  it("creates a mailto fallback for the contact action", () => {
    expect(getMailtoHref("thelifeofsahil@gmail.com")).toBe("mailto:thelifeofsahil@gmail.com");
  });
});
