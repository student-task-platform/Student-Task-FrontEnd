import { getIdToken } from '@/lib/firebase/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Backend-aligned DTOs
 * - C# DateTime? => string | null (or undefined if omitted)
 * - C# string?   => string | null (or undefined if omitted)
 */
export interface TaskResponseDto {
  id: number;
  title: string;
  description: string | null;
  isCompleted: boolean;
  deadlineUtc: string | null;
  createdAtUtc: string;
  updatedAtUtc: string | null;
  userId: number;
}

export interface TaskCreateDto {
  title: string;
  description?: string | null;
  deadlineUtc?: string | null; // ISO or null (nullable in C#)
}

export interface TaskUpdateDto {
  title: string;
  description?: string | null;
  isCompleted: boolean;
  deadlineUtc?: string | null; // ISO or null (nullable in C#)
}

/**
 * Helpers
 */
function requireApiBaseUrl(): string {
  if (!API_BASE_URL) {
    throw new Error(
      'API URL is not configured. Please set NEXT_PUBLIC_API_BASE_URL in your environment variables.'
    );
  }
  // Remove trailing slash if present
  return API_BASE_URL.replace(/\/+$/, '');
}

async function getAuthHeader(): Promise<Record<string, string>> {
  const token = await getIdToken();
  if (!token) {
    throw new Error('Authentication required. Please sign in again.');
  }

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

async function safeReadText(response: Response): Promise<string> {
  try {
    return await response.text();
  } catch {
    return '';
  }
}

function normalizeNullableString(value: unknown): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length === 0 ? null : trimmed;
  }
  return undefined;
}

function normalizeDeadlineUtc(
  value: unknown
): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;

  // If you ever pass Date from UI code, convert it safely
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? null : value.toISOString();
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length === 0 ? null : trimmed; // must not be ""
  }

  return undefined;
}

function normalizeCreatePayload(data: TaskCreateDto): TaskCreateDto {
  return {
    title: data.title,
    description: normalizeNullableString(data.description),
    deadlineUtc: normalizeDeadlineUtc(data.deadlineUtc),
  };
}

function normalizeUpdatePayload(data: TaskUpdateDto): TaskUpdateDto {
  return {
    title: data.title,
    isCompleted: data.isCompleted,
    description: normalizeNullableString(data.description),
    deadlineUtc: normalizeDeadlineUtc(data.deadlineUtc),
  };
}

async function handleNotOk(response: Response): Promise<never> {
  // Try to parse backend message if available
  const raw = await safeReadText(response);

  if (response.status === 401) throw new Error('Session expired. Please sign in again.');
  if (response.status === 403) throw new Error('You do not have permission to access this resource.');
  if (response.status === 404) throw new Error('Resource not found.');
  if (response.status === 503) throw new Error('Service temporarily unavailable. Please try again later.');

  // Try JSON parse (ASP.NET often returns ProblemDetails)
  try {
    const parsed = JSON.parse(raw);
    const msg =
      parsed?.message ||
      parsed?.title ||
      parsed?.error ||
      parsed?.detail ||
      `Request failed (Error ${response.status})`;
    throw new Error(msg);
  } catch {
    // Fallback to raw text
    throw new Error(raw || `Request failed (Error ${response.status})`);
  }
}

/**
 * TaskService class for managing tasks via API
 */
export class TaskService {
  /**
   * GET /api/Tasks
   */
  static async getAll(): Promise<TaskResponseDto[]> {
    const baseUrl = requireApiBaseUrl();
    const headers = await getAuthHeader();

    const response = await fetch(`${baseUrl}/api/Tasks`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) await handleNotOk(response);
    return (await response.json()) as TaskResponseDto[];
  }

  /**
   * GET /api/Tasks/{id}
   */
  static async getById(id: number): Promise<TaskResponseDto> {
    const baseUrl = requireApiBaseUrl();
    const headers = await getAuthHeader();

    const response = await fetch(`${baseUrl}/api/Tasks/${id}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) await handleNotOk(response);
    return (await response.json()) as TaskResponseDto;
  }

  /**
   * POST /api/Tasks
   */
  static async create(data: TaskCreateDto): Promise<TaskResponseDto> {
    const baseUrl = requireApiBaseUrl();
    const headers = await getAuthHeader();

    const payload = normalizeCreatePayload(data);

    const response = await fetch(`${baseUrl}/api/Tasks`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) await handleNotOk(response);
    return (await response.json()) as TaskResponseDto;
  }

  /**
   * PUT /api/Tasks/{id}
   */
  static async update(id: number, data: TaskUpdateDto): Promise<void> {
    const baseUrl = requireApiBaseUrl();
    const headers = await getAuthHeader();

    const payload = normalizeUpdatePayload(data);

    const response = await fetch(`${baseUrl}/api/Tasks/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) await handleNotOk(response);
  }

  /**
   * DELETE /api/Tasks/{id}
   */
  static async delete(id: number): Promise<void> {
    const baseUrl = requireApiBaseUrl();
    const headers = await getAuthHeader();

    const response = await fetch(`${baseUrl}/api/Tasks/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) await handleNotOk(response);
  }
}
