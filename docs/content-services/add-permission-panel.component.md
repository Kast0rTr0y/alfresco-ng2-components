---
Added: v2.4.0
Status: Active
Last reviewed: 2018-05-04
---

# Add Permission Component

Searches for people or groups to add to the current node permissions.

![Add Permission Component](../docassets/images/add-permission-component.png)

## Basic Usage

```html
<adf-add-permission [nodeId]="nodeId"
    (success)="onSuccess($event)" (error)="onError($event)">
</adf-add-permission>
```

## Class members

### Events

| Name | Type | Description |
| -- | -- | -- |
| select | `EventEmitter<any>` | Emitted when a permission list item is selected. |

## Details

This component uses a [Search component](../search.component.md) to retrieve the
groups and people that could be added to the permission list of the current node.
The `select` event is emitted when a result is clicked from the list.