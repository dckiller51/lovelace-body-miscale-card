# body-miscale-card (In progress)

Card for data of Xiaomi scales in the Lovelace user interface of Home Assistant

The card is linked to the Bodymiscale custom components for Xiaomi scales. https://github.com/dckiller51/bodymiscale

## Installation

Manually add [body-miscale-card.js](https://raw.githubusercontent.com/dckiller51/lovelace-body-miscale-card/master/body-miscale-card.js)
to your `<config>/www/` folder and add the following to the `configuration.yaml` file:
```yaml
lovelace:
  resources:
    - url: /local/body-miscale-card.js?v=1.0.0
      type: module
```

_OR_ install using [HACS](https://hacs.xyz/) and add this (if in YAML mode):
```yaml
lovelace:
  resources:
    - url: /hacsfiles/lovelace-body-miscale-card/body-miscale-card.js
      type: module
```

The above configuration can be managed directly in the Configuration -> Lovelace Dashboards -> Resources panel when not using YAML mode,
or added by clicking the "Add to lovelace" button on the HACS dashboard after installing the plugin.

If you want to use the scales background image, download and add
[img/miscale2.jpg](https://raw.githubusercontent.com/dckiller51/lovelace-body-miscale-card/master/img/miscale2.jpg)
to `<config>/www/img/` or configure your own preferred path.

## Configuration

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:body-miscale-card`
| entity | string | **Required** | `bodymiscale.name`
| name | string/bool | `friendly_name` | Override friendly name (set to `false` to hide)
| image | string/bool | `false` | Set path/filename of background image (i.e. `/local/img/miscale2.jpg`)
| attributes | [Entity Data](#entity data) | *(see below)* | Set to `false` to hide all attributes
| buttons | [Button Data](#button data) | *(see below)* | Set to `false` to hide button row

### Entity Data

Default bodymiscale attributes under each list:
- `attributes` (**right list**) include `weight`, `impedance` (Optional), `height`, `age` and `gender`.
- `body` (**left list**) include `water` (miscale 181B), `visceral_fat`, `body_fat` (miscale 181B), `bmi`, `muscle_mass` (miscale 181B), 
                                 `protein` (miscale 181B), `basal_metabolism`, `bone_mass` (miscale 181B), `metabolic_age` (miscale 181B),
								 `ideal`, `body_type`.

See [examples](#examples) on how to customize, hide or add custom attributes.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| key | string | **Required** | Attribute key on bodymiscale entity
| icon | string | | Optional icon
| label | string | | Optional label text
| unit | string | | Optional unit

### Button Data

Default buttons include `user1`, `user2`, `user3`, `user4` and `user5`.
See [examples](#examples) on how to customize, hide or add custom buttons/actions.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| icon | string | **Required** | Show or hide stop button
| service | string | **Required** | Service to call (`input_boolean.toggle`)
| show | bool | `true` | Show or hide button
| label | string | | Optional label on hover
| service_data | object | | entity_id: input_boolean.bodyscale_user1_info_toggle

### Other models

Define your model. miscale (181D) or miscale 2 (181B) (with to impedance)

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| model | string | `miscale` | Supported models: `miscale`, `181D`, `181B`

## Screenshots

![body-miscale-card](https://raw.githubusercontent.com/dckiller51/lovelace-body-miscale-card/master/examples/default.jpg)

![body-miscale-card-image](https://raw.githubusercontent.com/dckiller51/lovelace-body-miscale-card/master/examples/with-image.jpg)

## Examples

Basic configuration:
```yaml
- type: custom:body-miscale-card
  entity: bodymiscale.name
```

```yaml
- type: custom:body-miscale-card
  entity: bodymiscale.name
  image: /local/custom/folder/background.jpg
  name: My Bodymiscale
  model: '181D'
```

Hide specific attributes and/or buttons:
```yaml
- type: custom:body-miscale-card
  entity: bodymiscale.name
  attributes:
    age: false
    gender: false
  buttons:
    user1: false
``` 

Customize specific buttons:
```yaml
- type: custom:body-miscale-card
  entity: bodymiscale.name
  buttons:
    user1:
      icon: 'mdi:alpha-a-circle'
      label: Aurélien
      service_data:
        entity_id: input_boolean.bodyscale_aurelien_info_toggle
```

Add custom attributes:
```yaml
- type: custom:body-miscale-card
  entity: bodymiscale.name
  attributes:
    Body type:
      key: Body type
      label: 'Body type: '
    Water:
      key: Water
      label: 'Eau: '
      unit: '%'
```

Add custom buttons and service calls:
```yaml
- type: custom:body-miscale-card
  entity: bodymiscale.name
  buttons:
    new_button:
      icon: mdi:light-switch
      label: Custom button!
      service: light.turn_off
      service_data:
        entity_id: light.living_room
```

Translations:
```yaml
- type: custom:body-miscale-card
  entity: bodymiscale.name
  attributes:
    weight:
      label: 'Poids: '
      unit: ' kg'
    height:
      label: 'Taille: '
      unit: ' cm'
    age:
      label: 'Age: '
      unit: ' ans'
    gender:
      label: 'Genre: '
  buttons:
    user1:
      label: Aurélien
    user2:
      label: Siham
      show: true
```
## Credits
The card is based on the work of Ben Tomlin https://github.com/benct/lovelace-xiaomi-vacuum-card

## Disclaimer

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with the Xiaomi Corporation,
or any of its subsidiaries or its affiliates. The official Xiaomi website can be found at https://www.mi.com/global/.
