export const findById = (resource, id) => resource.find(r => r.id === id)

export const upsert = (resourcesArray, resource) => {
  const index = resourcesArray.findIndex(r => r.id === resource.id)
  if (resource.id && index !== -1) {
    resourcesArray[index] = resource
  } else {
    resourcesArray.push(resource)
  }
}