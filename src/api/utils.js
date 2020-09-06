let baseURL = 'http://localhost:8080';

if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://api.insapient.band';
}

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function fetchResources(resourceName) {
  const response = await fetch(`${baseURL}/${resourceName}`);
  const resources = await response.json();
  return resources;
}

export async function fetchResource(resourceName, resourceID) {
  const response = await fetch(`${baseURL}/${resourceName}/${resourceID}`, options);
  const resource = await response.json();
  return resource;
}

export async function createResource(resourceName, data) {
  const response = await fetch(`${baseURL}/${resourceName}`, {
    ...options,
    method: 'POST',
    headers: {
      ...options.headers,
    },
    body: JSON.stringify(data),
  });

  switch (response.status) {
    case 200:
      return 'Created Successfully';
    case 401:
      return 'Not Authorized';
    case 422:
      return 'Fill Out All The fields';
    case 500:
      return 'Something Went Wrong';
    default:
      return '';
  }
}

export async function updateResource(resourceName, resourceId, data) {
  const response = await fetch(`${baseURL}/${resourceName}/${resourceId}`, {
    ...options,
    method: 'PUT',
    headers: {
      ...options.headers,
      Authorization: `Bearer ${localStorage.getItem('stridentToken')}`,
    },
    body: JSON.stringify(data),
  });

  switch (response.status) {
    case 200:
      return 'Updated Successfully';
    case 401:
      return 'Not Authorized';
    case 422:
      return 'Fill Out All The Fields';
    case 500:
      return 'Something Went Wrong';
    default:
      return '';
  }
}

export async function deleteResource(resourceName, resourceId) {
  const response = await fetch(`${baseURL}/${resourceName}/${resourceId}`, {
    ...options,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('stridentToken')}`,
    },
  });

  switch (response.status) {
    case 200:
      return 'Deleted Successfully';
    case 401:
      return 'Not Authorized';
    case 500:
      return 'Something Went Wrong';
    default:
      return '';
  }
}
