# Changelog

All notable changes to this project will be documented in this file.

## v5.9.1

- added romania language support (thank you @18rrs)

## v5.9.0

- add the choice of the theme of your system. (Dark or light)
- added Spanish language (thanks to @luisetex84)

## v5.8.1

- fix error report [[#28](https://github.com/dckiller51/lovelace-body-miscale-card/issues/28)]

## v5.8.0

- update card editor to MWC

## v5.7.1

- fixed de/en syntax (thanks to @tispokes)
- fixed syntax error in Russian (thanks to @dmamontov)

## v5.7.0

- added Russian language (thanks to @BrainFixer)

## v5.6.9

- added Portuguese language (thanks to @jonhdimagio)
- Minor correction in Czech translation

## v5.6.8

- added Czech language (thanks to @xpavli44)

## v5.6.7

- fix: Icons not working in HA 2021.11

## v5.6.6

- Break. Delete webp icons and replace them with png icons to make them compatible with IOS and Safari browser. Attention you must replace your library in www/images/bodyscoreIcon/*.png

## v5.6.5

- added IT language (thanks to @Altar82)

## v5.6.4

- fix CN language to zh-Hans

## v5.6.3

- added CN language (thanks to @sasukebinbin)

## v5.6.2

- fix: Change of target for bone mass

## v5.6.1

- fix: change default values for lbs

## v5.6.0

- Add a switch to convert kg to lbs

## v5.5.0

- Partial integration of bar card options for the body part. (thanks to the contributors of bar-card <https://github.com/custom-cards/bar-card> )
  Options = Partial (Does not work = animation, columns, decimal, complementary, direction)
                    (work = color, height, max, min, positions, severity, target, width)
  Severity Options = OK (from, to, color)
  Positions Options = OK (icon, name, minmax, value (inside, outside, off))
  
  To know the start, destination, color and target values, open your Mi Fit app on your smartphone.

## v5.0.0

- Conversion to Typescript language (Lit 2)
- Adding the number format according to your system language
- In case of a sensor error the alert icon flashes red
- If no sensor problem the alert icon disappears
- Added chevron-up and chevron-down icons to show or hide measurement details

## v4.6.1

- fix

## v4.6.0

- added NL language (thanks to @llewy)
- update of the elements and translation of the configuration map
- replace the model choice with a switch (Warning: if you upgrade from 4.5.0 to 4.6.0, you must activate a return trip to take into account )

**special thanks to @typxxi for his help in developing the new update and for his extensive testing.**

## v4.5.0

- add BMI Label

## v4.1.1

- fix

## v4.1.0

- added DE language
- replace the icons of materialdesignicons by the official "mifit" icons for the score body

## v4.0.0

- use snake_case format for attribute names (thanks to Pavel Popov <https://github.com/dckiller51/bodymiscale/pull/13>)
- replace custom icons with materialdesignicons icons
- add a toolbar for score and service icons

## v3.1.0

- complete translation of card elements
- added pt-BR language

## v3.0.3

- fix

## v3.0.2

- rename the version with 'v'

## 3.0.1

- fix

## 3.0.0

- added card configuration support
- added automatic translation EN/FR (please contribute to add your language)

## 2.1.0

- Click on the icon to show or hide your score

## 2.0.0

- add the states (on the left)
- move the attributes of the body score "body" (on the bottom)

## 1.0.1

- add the attributes of the body score "body" (for the moment on the left)
example customize:
body:
  water:
    label: 'Water: '
  
- add the customize icon

## 1.0.0

- **Initial release**
