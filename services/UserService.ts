import { getIdToken } from '@/lib/firebase/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface CreateMeDto {
  fullName: string;
}

export interface UserResponse {
  userId: number;
  fullName: string;
  firebaseUid: string;
}

/**
 * Get authorization header with Firebase ID token
 */
async function getAuthHeader(): Promise<Record<string, string> | null> {
  const token = await getIdToken();
  if (!token) {
    return null;
  }
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

/**
 * Create or get current user in backend
 * POST /api/users/me
 */
export async function createMe(data: CreateMeDto): Promise<UserResponse> {
  const headers = await getAuthHeader();
  if (!headers) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to create user' }));
    throw new Error(error.message || 'Failed to create user');
  }

  return await response.json();
}

/**
 * Get current user from backend
 * GET /api/users/me
 */
export async function getMe(): Promise<UserResponse> {
  const headers = await getAuthHeader();
  if (!headers) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to fetch user' }));
    throw new Error(error.message || 'Failed to fetch user');
  }

  return await response.json();
}
