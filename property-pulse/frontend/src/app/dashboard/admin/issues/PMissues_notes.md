# The problem:
PM wants to be able to view issues

1.  ~~All issues in DB.~~
2. ~~All issues from tenants in their properties~~ (...because some tenants may also be renting units from other PM).
3. **All issues *associated* with units *associated* with PM's properties.**

> point 2 is probably fine because a given tenant with units from different PM's would also be regeistered separately by those PM's. Therefore the current way of getting issues from <GET: /admin/issues> works fine.
> * but perhaps tenants would like to have only 1 account in the event more than one landlord uses this app.

<br/>
<br/>
<br/>

# Solution:
- Tenant needs to have a unit value attached to residence property.
> This is what I need to figure out. 
>
> 1. Shouldn't this happen when an admin creates the tenant and assigns Property & Unit to them?

####  When a tenant creates an issue the following needs to happen:

- If they are registered at more than one address they have to select which ***unit*** the issue is for.

OR

- If they are registered at only one address the default value will be the first and only option.


<br/>
<br/>
<br/>

# NOTES:
### Logging output from Properties and Units creation in FE.

```Javascript
Properties:
{
   id: 17,
   ownerId: 40,
   name: 'Fawlty Towers ',
   description: 'A tower with 2 units.'
 }

Units:
{ id: 21, propertyId: 17, name: '', description: '', rent: 0 }
{ id: 22, propertyId: 17, name: '', description: '', rent: 0 }
{ id: 23, propertyId: 16, name: '', description: '', rent: 0 }
```