import {doc, getDoc, getDocs, query, where, collection, documentId} from 'firebase/firestore'
import {db} from '@/firebase'

export const findById = (resource, id) => resource.find(r => r.id === id)

export const upsert = (resourcesArray, resource) => {
  // console.log('Upsert', resourcesArray)
  const index = resourcesArray.findIndex(r => r.id === resource.id)
  if (resource.id && index !== -1) {
    resourcesArray[index] = resource
  } else {
    resourcesArray.push(resource)
  }
}

export const fetchItem = async function ({ resource, id, stateResource }) {
  let item = null
  const itemSnap = await getDoc(doc(db, resource, id))
  if (itemSnap.exists()) {
    item = { ...itemSnap.data(), id: itemSnap.id }
    upsert(stateResource, item)
  } else {
    console.log('Something went wrong fetching item')
  }
  return item
}

export const fetchItems = async function (ids, resource, stateResource) {
  let items = []
  const q = ids.length > 0 ?
    query(collection(db, resource), where(documentId(), 'in', ids)) :
    query(collection(db, resource))
  const itemsArray = await getDocs(q)
  itemsArray.forEach((item) => {
    item = { ...item.data(), id: item.id }
    upsert(stateResource, item)
    items.push(item)
  })
  return items
}

export const setItem = (resource, item) => {
  upsert(resource, item)
}

export const addChildToParent = (parentResourceArray, childResource, parentId, childId) => {
  const parent = findById(parentResourceArray, parentId)
  parent[childResource] = parent[childResource] || []
  if (!parent[childResource].includes(childId)) {
    parent[childResource].push(childId)
  }
}