# Sequelize notes:

## Common DB methods:


## Associations:
- We need to run sequelize.sync() whenever an association is updated. You can just run 
  this inside the db/model file where you have access to the sequelize object. Again,
  any association changes will not take effect unless this is run.

- Sample 1 to many relationship:

- Sample Many to many relationship:

- Sample 1 to 1 relationship:

## Scopes:
Scopes are for

## Quirks:
There are a few different ways to make changes to an instance object:
instance.setDataValue('isActive', true)
instance.isActive = true
instance.set('isActive', true)