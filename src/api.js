const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api/v1').replace(/\/$/, '');

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(typeof body.detail === 'string' ? body.detail : 'Request failed.');
    error.status = response.status;
    throw error;
  }
  return body;
}

export const ownerApi = {
  login(email, password) {
    return request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  },
  me(accessToken) {
    return request('/auth/me', { headers: { Authorization: `Bearer ${accessToken}` } });
  },
  logout(accessToken) {
    return request('/auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${accessToken}` } });
  },
  publicPlans() {
    return request('/platform-plans/public');
  },
  plans(accessToken) {
    return request('/platform-plans', { headers: { Authorization: `Bearer ${accessToken}` } });
  },
  updatePlan(planId, changes, accessToken) {
    return request(`/platform-plans/${planId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(changes),
    });
  },
  submitInquiry(payload) {
    return request('/gym-inquiries', { method: 'POST', body: JSON.stringify(payload) });
  },
  inquiries(accessToken) {
    return request('/developer/inquiries', { headers: { Authorization: `Bearer ${accessToken}` } });
  },
  updateInquiry(inquiryId, changes, accessToken) {
    return request(`/developer/inquiries/${inquiryId}`, {
      method: 'PATCH', headers: { Authorization: `Bearer ${accessToken}` }, body: JSON.stringify(changes),
    });
  },
  inviteInquiry(inquiryId, accessToken) {
    return request(`/developer/inquiries/${inquiryId}/invite`, {
      method: 'POST', headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  gyms(accessToken) {
    return request('/developer/gyms', { headers: { Authorization: `Bearer ${accessToken}` } });
  },
  freeTrials(accessToken) {
    return request('/developer/free-trials', { headers: { Authorization: `Bearer ${accessToken}` } });
  },
  loginEvents(accessToken) {
    return request('/developer/login-events?limit=100', { headers: { Authorization: `Bearer ${accessToken}` } });
  },
  setGymSubscription(gymId, payload, accessToken) {
    return request(`/developer/gyms/${gymId}/subscription`, {
      method: 'PUT', headers: { Authorization: `Bearer ${accessToken}` }, body: JSON.stringify(payload),
    });
  },
};
