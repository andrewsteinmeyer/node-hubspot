const Property = require('./deal_property')

class Deal {
  constructor(client) {
    this.client = client
    this.properties = new Property(client)
  }

  get(options) {
    return this.client._request({
      method: 'GET',
      path: '/deals/v1/deal/paged',
      qs: options,
      useQuerystring: true,
    })
  }

  getRecentlyModified(options) {
    return this.client._request({
      method: 'GET',
      path: '/deals/v1/deal/recent/modified',
      qs: options,
    })
  }

  getRecentlyCreated(options) {
    return this.client._request({
      method: 'GET',
      path: '/deals/v1/deal/recent/created',
      qs: options,
    })
  }

  getById(id) {
    return this.client._request({
      method: 'GET',
      path: '/deals/v1/deal/' + id,
    })
  }

  getAssociated(objectType, objectId, options) {
    return this.client._request({
      method: 'GET',
      path:
        '/deals/v1/deal/associated/' + objectType + '/' + objectId + '/paged',
      qs: options,
    })
  }

  deleteById(id) {
    return this.client._request({
      method: 'DELETE',
      path: '/deals/v1/deal/' + id,
    })
  }

  updateById(id, data) {
    return this.client._request({
      method: 'PUT',
      path: '/deals/v1/deal/' + id,
      body: data,
    })
  }

  create(data) {
    return this.client._request({
      method: 'POST',
      path: '/deals/v1/deal',
      body: data,
    })
  }

// UPDATE : Using CRM-Associations API because Deals API associate is deprecated.
// ANDREW   3 is the Hubspot Definition id to associate a deal to a contact.
//          https://developers.hubspot.com/docs/methods/crm-associations/crm-associations-overview

  associate(id, associatedObjectId) {
    return this.client._request({
      method: 'PUT',
      path: '/crm-associations/v1/associations/',
      body: {
        "fromObjectId": id,
        "toObjectId": associatedObjectId,
        "category": "HUBSPOT_DEFINED",
        "definitionId": 3
      }
    })
  }

  removeAssociation(id, objectType, associatedObjectId) {
    return this.client._request({
      method: 'DELETE',
      path:
        '/deals/v1/deal/' +
        id +
        '/associations/' +
        objectType +
        '?id=' +
        associatedObjectId,
    })
  }
}

module.exports = Deal
