import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

import { projects } from "@/data/portfolioData";
import Home from "@/pages/Home";
import { useDesktopStore } from "@/store/desktopStore";

const storage = new Map<string, string>();

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
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
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: 1280,
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
  it("renders the core hero and desktop navigation", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: /I build ultra-fast, modern websites./i })).toBeInTheDocument();
    expect(screen.getByText(/pwloOS v1.0/i)).toBeInTheDocument();
    expect(screen.getByText(/Performance: 100/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: Online/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Resize Projects/i)).toHaveLength(8);
    expect(screen.getByRole("button", { name: /View Projects/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Contact Me/i })).toBeInTheDocument();
  });

  it("opens the contact window from the desktop icon", () => {
    render(<Home />);

    fireEvent.click(screen.getAllByRole("button", { name: /Contact Start a project 24h/i })[0]);

    expect(screen.getAllByText("pawel@pwlo.dev").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("heading", { name: /Let's build something fast./i }).length).toBeGreaterThan(0);
  });

  it("renders draggable headers for floating windows", () => {
    render(<Home />);

    expect(screen.getAllByLabelText(/Drag Projects/i).length).toBeGreaterThan(0);
  });

  it("switches the interface to Polish", () => {
    render(<Home />);

    fireEvent.click(screen.getAllByRole("button", { name: "PL" })[0]);

    expect(screen.getAllByText(/Tworze ultraszybkie, nowoczesne strony internetowe./i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Czas lokalny:/i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /Zobacz projekty/i }).length).toBeGreaterThan(0);
  });

  it("minimizes a window and reopens it from the desktop icon", () => {
    render(<Home />);

    const initialProjectHeaders = screen.queryAllByLabelText(/Drag Projects/i).length;

    fireEvent.click(screen.getAllByRole("button", { name: /Minimize window/i })[0]);

    expect(screen.queryAllByLabelText(/Drag Projects/i).length).toBeLessThan(initialProjectHeaders);

    fireEvent.click(screen.getAllByRole("button", { name: /Projects Case studies 06/i })[0]);

    expect(screen.getAllByLabelText(/Drag Projects/i).length).toBeGreaterThanOrEqual(initialProjectHeaders);
  });

  it("maximizes and restores a window", () => {
    render(<Home />);

    const initialResizeHandles = screen.queryAllByLabelText(/Resize Projects/i).length;

    fireEvent.click(screen.getAllByRole("button", { name: /Maximize window/i })[0]);

    expect(screen.getAllByRole("button", { name: /Restore window/i }).length).toBeGreaterThan(0);
    expect(screen.queryAllByLabelText(/Resize Projects/i).length).toBeLessThan(initialResizeHandles);

    fireEvent.click(screen.getAllByRole("button", { name: /Restore window/i })[0]);

    expect(screen.getAllByLabelText(/Resize Projects/i).length).toBeGreaterThanOrEqual(initialResizeHandles);
  });

  it("switches the active case study when a project is selected", () => {
    render(<Home />);

    fireEvent.click(screen.getAllByRole("button", { name: /Magic Colouring Book/i })[0]);

    expect(screen.getAllByText("magiccolouringbook.app").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Live application preview available now/i).length).toBeGreaterThan(0);
  });

  it("submits the contact form to Supabase", async () => {
    const { container } = render(<Home />);

    fireEvent.click(screen.getAllByRole("button", { name: /Contact Start a project 24h/i })[0]);

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

    const { container } = render(<Home />);

    fireEvent.click(screen.getAllByRole("button", { name: /Leads Protected view ADM/i })[0]);

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
