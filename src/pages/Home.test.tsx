import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const { submitLeadMock, fetchAdminLeadsMock } = vi.hoisted(() => {
  const submitLead = vi.fn();
  const fetchAdminLeads = vi.fn();

  return {
    submitLeadMock: submitLead,
    fetchAdminLeadsMock: fetchAdminLeads,
  };
});

vi.mock("@/lib/leadsApi", () => ({
  submitLead: submitLeadMock,
  fetchAdminLeads: fetchAdminLeadsMock,
}));

vi.mock("@/lib/sequenceLoader", () => {
  const frame = { naturalWidth: 1920, naturalHeight: 1080 } as HTMLImageElement;

  return {
    SEQUENCE_FRAME_COUNT: 40,
    loadSequenceFrames: vi.fn(async () => Array.from({ length: 40 }, () => frame)),
    getFrameIndexForProgress: (progress: number) =>
      Math.min(39, Math.floor(Math.min(1, Math.max(0, progress)) * 39)),
  };
});

import { projects } from "@/data/portfolioData";
import Home from "@/pages/Home";
import { getScrollVisualState } from "@/lib/scrollProgress";
import { useDesktopStore } from "@/store/desktopStore";

const storage = new Map<string, string>();
const desktopPrivacyConsentStorageKey = "pwlo-desktop-privacy-accepted-v1";

function revealDesktopForTests() {
  const sticky = document.querySelector(".scroll-animation-sticky") as HTMLElement | null;

  if (!sticky) {
    return;
  }

  const visualState = getScrollVisualState(0.75, 29);

  sticky.style.setProperty("--scroll-progress", visualState.progress.toFixed(4));
  sticky.style.setProperty("--hero-opacity", visualState.heroOpacity.toFixed(4));
  sticky.style.setProperty("--hero-translate-y", `${visualState.heroTranslateY.toFixed(2)}px`);
  sticky.style.setProperty("--desktop-opacity", visualState.desktopOpacity.toFixed(4));
  sticky.style.setProperty("--desktop-blur", `${visualState.desktopBlur.toFixed(2)}px`);
  sticky.style.setProperty("--desktop-scale", visualState.desktopScale.toFixed(4));
  sticky.style.setProperty("--desktop-translate-y", `${visualState.desktopTranslateY.toFixed(2)}px`);
  sticky.style.setProperty("--hero-pointer-events", "none");
  sticky.style.setProperty("--desktop-pointer-events", "auto");
  sticky.dataset.sequenceFrame = String(visualState.frameIndex);
  sticky.dataset.desktopRevealed = "true";
}

async function renderDesktopHome() {
  window.localStorage.setItem(desktopPrivacyConsentStorageKey, "true");
  const view = render(<Home />);

  await waitFor(() => {
    expect(document.querySelector(".scroll-animation-sticky")).toBeInTheDocument();
  });

  revealDesktopForTests();

  return view;
}

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => {
      const maxWidthMatch = query.match(/max-width:\s*(\d+)px/);
      const minWidthMatch = query.match(/min-width:\s*(\d+)px/);
      let matches = false;

      if (maxWidthMatch) {
        matches = window.innerWidth <= Number(maxWidthMatch[1]);
      } else if (minWidthMatch) {
        matches = window.innerWidth >= Number(minWidthMatch[1]);
      }

      return {
        matches,
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      };
    },
  });

  Object.defineProperty(window, "localStorage", {
    writable: true,
    value: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => {
        storage.set(key, value);
      },
      removeItem: (key: string) => {
        storage.delete(key);
      },
      clear: () => {
        storage.clear();
      },
    },
  });
});

beforeEach(() => {
  cleanup();
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: 1440,
  });
  Object.defineProperty(window, "innerHeight", {
    writable: true,
    configurable: true,
    value: 900,
  });
  window.localStorage.clear();
  submitLeadMock.mockClear();
  fetchAdminLeadsMock.mockClear();
  submitLeadMock.mockResolvedValue({ ok: true });
  fetchAdminLeadsMock.mockResolvedValue([]);
  useDesktopStore.setState({
    locale: "en",
    theme: "light",
    openWindows: ["projects"],
    activeWindow: "projects",
    selectedProjectId: projects[0].id,
  });
});

describe("Home", () => {
  it("renders the mobile and tablet OS layout below the desktop breakpoint", async () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 768,
    });

    render(<Home />);

    await waitFor(() => {
      expect(document.querySelector(".os-shell")).toBeInTheDocument();
    });

    expect(document.querySelector(".scroll-animation")).not.toBeInTheDocument();
    expect(document.querySelector(".portfolio-shell")).not.toBeInTheDocument();
  });

  it("renders the core hero and desktop navigation", async () => {
    await renderDesktopHome();

    expect(screen.getAllByText(/Welcome to pwloOS/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/pwloOS v1.0/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status: Online/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Resize Projects/i)).toHaveLength(8);
  });

  it("opens the contact window from the desktop icon", async () => {
    await renderDesktopHome();

    fireEvent.click(screen.getAllByRole("button", { name: /Contact: Start a project/i })[0]);

    expect(await screen.findByText("contact@pwlo.dev")).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: /Let's build something fast./i })).toBeInTheDocument();
  });

  it("renders draggable headers for floating windows", async () => {
    await renderDesktopHome();

    expect(screen.getAllByLabelText(/Drag Projects/i).length).toBeGreaterThan(0);
  });

  it("switches the interface to Polish", async () => {
    useDesktopStore.setState({ locale: "pl" });
    await renderDesktopHome();

    expect(screen.getAllByText(/Witaj w pwloOS/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Czas lokalny:/i).length).toBeGreaterThan(0);
  });

  it("minimizes a window and reopens it from the desktop icon", async () => {
    await renderDesktopHome();

    const initialProjectHeaders = screen.queryAllByLabelText(/Drag Projects/i).length;

    fireEvent.click(screen.getAllByRole("button", { name: /Minimize window/i })[0]);

    expect(screen.queryAllByLabelText(/Drag Projects/i).length).toBeLessThan(initialProjectHeaders);

    fireEvent.click(screen.getAllByRole("button", { name: /Projects: Case studies/i })[0]);

    expect(screen.getAllByLabelText(/Drag Projects/i).length).toBeGreaterThanOrEqual(initialProjectHeaders);
  });

  it("maximizes and restores a window", async () => {
    await renderDesktopHome();

    const initialResizeHandles = screen.queryAllByLabelText(/Resize Projects/i).length;

    fireEvent.click(screen.getAllByRole("button", { name: /Maximize window/i })[0]);

    expect(screen.getAllByRole("button", { name: /Restore window/i }).length).toBeGreaterThan(0);
    expect(screen.queryAllByLabelText(/Resize Projects/i).length).toBeLessThan(initialResizeHandles);

    fireEvent.click(screen.getAllByRole("button", { name: /Restore window/i })[0]);

    expect(screen.getAllByLabelText(/Resize Projects/i).length).toBeGreaterThanOrEqual(initialResizeHandles);
  });

  it("switches the active case study when a project is selected", async () => {
    await renderDesktopHome();

    fireEvent.click(screen.getAllByRole("button", { name: /Magic Colouring Book/i })[0]);

    expect(screen.getAllByText("magiccolouringbook.app").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Live application preview available now/i).length).toBeGreaterThan(0);
  });

  it("submits the contact form to Supabase", async () => {
    const { container } = await renderDesktopHome();

    fireEvent.click(screen.getAllByRole("button", { name: /Contact: Start a project/i })[0]);

    const form = container.querySelector(".contact-form") as HTMLFormElement;
    const nameInput = form.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
    const projectTypeInput = form.querySelector('input[name="projectType"]') as HTMLInputElement;
    const messageInput = form.querySelector("textarea") as HTMLTextAreaElement;

    fireEvent.change(nameInput, {
      target: { value: "Pawel" },
    });
    fireEvent.change(emailInput, {
      target: { value: "pawel@example.com" },
    });
    fireEvent.change(projectTypeInput, {
      target: { value: "Portfolio" },
    });
    fireEvent.change(messageInput, {
      target: { value: "Need a fast landing page." },
    });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(submitLeadMock).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Pawel",
          email: "pawel@example.com",
          projectType: "Portfolio",
          message: "Need a fast landing page.",
          locale: "en",
          pageOrigin: expect.any(String),
          website: "",
          submissionDurationMs: expect.any(Number),
        }),
      );
    });

    expect(await screen.findByText(/Inquiry sent successfully./i)).toBeInTheDocument();
  });

  it("loads protected leads with an admin key", async () => {
    fetchAdminLeadsMock.mockResolvedValue([
      {
        id: "lead-1",
        name: "Test User",
        email: "test@example.com",
        project_type: "Landing page",
        message: "Need a redesign.",
        locale: "en",
        page_origin: "http://localhost/",
        submitted_at: "2026-07-06T10:00:00.000Z",
        is_spam: false,
        spam_reason: null,
        alert_sent_at: "2026-07-06T10:00:01.000Z",
        alert_error: null,
        submission_duration_ms: 5000,
      },
    ]);

    const { container } = await renderDesktopHome();

    fireEvent.click(screen.getAllByRole("button", { name: /Leads: Protected view/i })[0]);

    const leadsInput = container.querySelector('.leads-admin-key input') as HTMLInputElement;
    const loadButton = container.querySelector('.leads-controls button') as HTMLButtonElement;

    fireEvent.change(leadsInput, {
      target: { value: "secret-admin-key" },
    });
    fireEvent.click(loadButton);

    await waitFor(() => {
      expect(fetchAdminLeadsMock).toHaveBeenCalledWith("secret-admin-key");
    });

    expect(await screen.findByText("test@example.com")).toBeInTheDocument();
  });
});
