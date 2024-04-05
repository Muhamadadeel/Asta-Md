# Asta Md 2024
-----------------------
### Simple WhatsApp Bot
-----------------------

-----------------------
### Documentations
```/**
 * PostgreSQL Database Helper Functions
 * 
 * This module provides a set of functions for interacting with a PostgreSQL database.
 * 
 * @module pg
 */

/**
 * Establishes a connection to the PostgreSQL database.
 * 
 * @returns {boolean} Returns true if the connection is successful, otherwise false.
 */
pg.connectpg = () => {
  // Implementation details...
};

/**
 * Creates a table in the database if it doesn't already exist.
 * 
 * @param {string} tableName - The name of the table to be created.
 * @returns {boolean} Returns true if table creation is successful, otherwise false.
 */
pg.createTable = async (tableName) => {
  // Implementation details...
};

/**
 * Inserts a new record into the specified table.
 * 
 * @param {string} tableName - The name of the table.
 * @param {object} data - The data to be inserted.
 * @returns {object|boolean} Returns the inserted record if successful, otherwise false.
 */
pg.new = async (tableName, data) => {
  // Implementation details...
};

/**
 * Returns the count of documents in the specified table.
 * 
 * @param {string} tableName - The name of the table.
 * @returns {number} The count of documents in the table.
 */
pg.countDocuments = async (tableName) => {
  // Implementation details...
};

/**
 * Retrieves a single document from the specified table based on the provided ID.
 * 
 * @param {string} tableName - The name of the table.
 * @param {object} data - The ID of the document to retrieve.
 * @returns {object|boolean} Returns the retrieved document if found, otherwise false.
 */
pg.findOne = async (tableName, data) => {
  // Implementation details...
};

/**
 * Retrieves documents from the specified table based on the provided query parameters.
 * 
 * @param {string} tableName - The name of the table.
 * @param {object} [query={}] - The query parameters.
 * @returns {Array} An array of documents matching the query criteria.
 */
pg.find = async (tableName, query = {}) => {
  // Implementation details...
};

/**
 * Updates a single document in the specified table.
 * 
 * @param {string} tableName - The name of the table.
 * @param {object} selector - The selector (usually ID) for the document to update.
 * @param {object} update - The data to update the document with.
 * @returns {object|boolean} Returns the updated document if successful, otherwise false.
 */
pg.updateOne = async (tableName, selector, update = {}) => {
  // Implementation details...
};

/**
 * Finds and deletes a single document from the specified table.
 * 
 * @param {string} tableName - The name of the table.
 * @param {object} selector - The selector (usually ID) for the document to delete.
 * @returns {object|boolean} Returns the deleted document if found and deleted, otherwise false.
 */
pg.findOneAndDelete = async (tableName, selector) => {
  // Implementation details...
};

/**
 * Collection-related operations for PostgreSQL tables.
 */
pg.collection = {

  /**
   * Drops (deletes) the specified table from the database.
   * 
   * @param {string} tableName - The name of the table to drop.
   * @returns {boolean} Returns true if table dropping is successful, otherwise false.
   */
  drop: async (tableName) => {
    // Implementation details...
  }
};
```