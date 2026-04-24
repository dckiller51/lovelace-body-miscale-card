# Changelog

All notable changes to this project will be documented in this file.

---

## 2026.4.0

- 🛠️ **Fixed**: Resolved an issue where certain values could not be modified or saved in the card editor (improved state management).
- 🛠️ **Fixed**: Replaced obsolete mwc-list-item components with ha-list-item for better compatibility with the latest Home Assistant versions.
- 📦 **Dependencies**: Updated all packages and migrated to official Rollup plugins (@rollup/plugin-typescript).

## 2025.11.0

- 🛠️ **Fixed**: Resolved a console warning that appeared for users without a default language set in their Home Assistant profile (thank you @miguelangel-nubla).

## 2025.9.0

- ✅ **Added** Danish language support (thank you @Milfeldt).

## 2025.8.0

- 🛠️ **Fixed** an icon color issue by replacing `--paper-item-icon-color` with `--state-icon-color`. [[#128](https://github.com/dckiller51/lovelace-body-miscale-card/issues/128)]

## 2025.5.0

- ✅ **Added** Ukrainian language support (thank you @MaxStupnitskyi)

## 2025.4.6

- 🛠️ **Improved** The `.scroll-wrapper`'s `max-height` has been adjusted for better content accessibility across various screen sizes.
  - On screens with a width of 600px or less (typically phones), the `max-height` is set to `50vh`.
  - On screens with a height of 600px or more, the `max-height` is set to `300px`.
  - For other screen sizes, the `max-height` defaults to `40vh`.
  This change ensures that all content within the scrollable area is accessible without being cut off on smaller screens while providing a more controlled height on larger displays.

## 2025.4.5

- 🔧 **Improved**: Minimum and maximum values for metric thresholds are now automatically calculated based on the severity configuration, eliminating the need for manual definition.
- 🛠️ **Fixed** The .scroll-wrapper now has a max-height set to 40vh, ensuring that larger screens display the scrollbar all the way to the bottom when content exceeds this height.
- 🔄 **Updated** Reduced vertical spacing for metrics that do not have a progress bar displayed.
- ✨ **Added**: Users can now customize the label displayed for each severity level within the editor.
- ✨ **Added**: Implemented functionality to generate a full YAML configuration based on the defined severity profiles and user inputs.

## 2025.4.4

- 🛠 **Added**: Severity Profile Generator tool to help configure and preview metric thresholds (weight, ideal, bmi, etc.) based on gender, age, height, and weight.
- ⚖️ **Support**: Added unit selection (kg/lbs) for metrics like weight, ideal, bone_mass, and muscle_mass.
- ℹ️ **UI**: Added info icon linking to the [Severity Generator helper tool](https://dckiller51.github.io/lovelace-body-miscale-card/) in the severity editing section.

## 2025.4.3

- ✨ **Added**: Ability to dynamically position icon, name, and value to the left or right, with the option to turn them off.
- 🔄 **Updated**: Editor translations for positioning options ("left", "right") which replace the previous "inside" and "outside" options.
- 🎯 **Added**: Marker circle positioned correctly for the new segmented color bar.
- 🎨 **Updated**: CSS styling for icon and value positioning, ensuring correct alignment and responsiveness on mobile devices.
- 💬 **Enhanced**: Tooltip visibility: values are now shown on hover or tap, particularly useful on mobile devices.
- 🔄 **Updated**: Bar styling: Removed fixed `height` for the color bar to allow it to adjust dynamically based on the content width.
- 📊 **Added**: Segment upper bound values now displayed above each colored segment for better readability.
- 🌍 **Updated**: Translations for positioning options ("left", "right") in multiple languages.
- ✨ **Added**: Show labels above and below segments for better information visibility. This option is configurable via `showabovelabels` and `showbelowlabels` to allow flexibility in display preferences.
- 🔄 **Updated**: `showabovelabels` and `showbelowlabels` now support dynamic toggling and are part of the card's configurable options. Default values are `true`, but can be set to `false` to hide labels when required.

### ⚠️ **Warning**: Major Change

The bar representation has been replaced with segmented color bars. Please review your configuration and make necessary adjustments to ensure compatibility.

### Action Required

- **Remove and Re-add the Card**: To ensure compatibility with the new segmented bar representation, you must **remove the current card** from your configuration and then **add it back again**.
- **Review Configuration**: Ensure that your configuration aligns with the new segmented color bar structure. For example, the `color`, `min`, and `max` values might need to be adjusted for better visual clarity.

## 2025.4.2

- 🛠️ **Fixed** Issue with severity resetting when modifying or deleting lines in the editor.
- 🔧 **Improved** Handling of undefined/null severity values with proper default fallback logic.

## 2025.4.1

- ✨ **Feature** Added the ability to customize the icons directory.
- 🛠️ **Improved** Icon rendering with cross-browser `mask-image` support for better compatibility

## 2025.4.0

- ✅ **Added** Catalan language support (thank you @RmG152)

## 2025.3.1

- ✅ **Added** Japanese language support (thank you @voidz777)
- ✨ **Added** ability to switch accounts using buttons in the UI, allowing users to dynamically change the displayed entity.
- ✨ **Added** page navigation to the editor, allowing users to switch between "Configuration" and "Customization" settings, enhancing the user experience and organization of settings.
- 🚀 **Refactored** `renderIcon` and `renderIconbody` into a single method `renderIcon(data, type)`, reducing code duplication and improving maintainability.
- 🔥 **Removed** the need for a service, simplifying the implementation and improving responsiveness.
- 🔥 **Removed** support for the `up` direction across the application, simplifying the layout and logic to support only the `right` direction.
- 🔧 **Fixed** icon alignment within toolbar buttons by setting `font-size: 0px` to prevent inherited font sizes from affecting layout.

## 2025.3.0

- ➕ **Added** `buildStyles` function to centralize and simplify style logic in `buildConfig`.
- ➕ **Added** default value management for `image`, `name`, `buttons`, and other configuration options.
- ♻️ **Improved** refactored `buildConfig` for better readability and maintainability.
- 🛠️ **Fixed** alignment and `border-radius` handling based on the presence of `show_toolbar`.
- 🔧 **Fixed** minor CSS optimizations for button padding and background color management.
- 🔧 **Fixed** reversed logic to remove content when `stateObj.state === 'ok'` and `data.icon === 'mdi:alert'` than hide rather.
- ️🔧 **Fixed** Issue with Card Display in Section Mode When Sensors Are Unavailable [[#56](https://github.com/dckiller51/lovelace-body-miscale-card/issues/56)]
- ➕ **Added** option to fully hide the card header [[#48](https://github.com/dckiller51/lovelace-body-miscale-card/issues/48)]
- ➕ **Added** Last measurement time update information (introduced in Bodymiscale component 2025.2.19-beta pre-release).
- ♻️ **Improved** code compatibility with recent Node.js versions.

## 2024.08.0

- ✅ **Added** Vietnamese language support (thank you @ngdaihoc)
- 🔧 **Fixed** syntax error in Polish (thanks to @kuduacz)

## 2023.11.0

- ✅ **Added** Traditional Chinese language support (thank you @yauyauwind)
- 🔄 **Changed** versioning system to a calendar format (year.month.patch)

## v5.9.6

- 🌍 **Updated** translations for compatibility with Bodymiscale v3.1.1

## v5.9.5

- 🛠️ **Fixed** icons issue in Firefox [[#45](https://github.com/dckiller51/lovelace-body-miscale-card/issues/45)]

## v5.9.4

- ✅ **Added** Hungarian language support (thank you @v1k70rk4)

## v5.9.3

- ➕ **Added** "Always show details" option

## v5.9.2

- ✅ **Added** Polish language support (thank you @LukaszP2)

## v5.9.1

- ✅ **Added** Romanian language support (thank you @18rrs)

## v5.9.0

- 🎨 **Added** system theme selection (Dark or Light mode)
- ✅ **Added** Spanish language support (thanks to @luisetex84)

## v5.8.1

- 🛠️ **Fixed** error report [[#28](https://github.com/dckiller51/lovelace-body-miscale-card/issues/28)]

## v5.8.0

- 🆕 **Updated** card editor to MWC

## v5.7.1

- 🔧 **Fixed** syntax issues in German and English (thanks to @tispokes)
- 🔧 **Fixed** syntax error in Russian (thanks to @dmamontov)

## v5.7.0

- ✅ **Added** Russian language support (thanks to @BrainFixer)

## v5.6.9

- ✅ **Added** Portuguese language support (thanks to @jonhdimagio)
- 🔄 **Updated** minor correction in Czech translation

## v5.6.8

- ✅ **Added** Czech language support (thanks to @xpavli44)

## v5.6.7

- 🛠️ **Fixed**: Icons not working in HA 2021.11

## v5.6.6

- ⚠️ **Breaking Change**: Replaced webp icons with png icons for better iOS and Safari compatibility.
  - **Action Required**: Replace your library in `www/images/bodyscoreIcon/*.png`

## v5.6.5

- ✅ **Added** Italian language support (thanks to @Altar82)

## v5.6.4

- 🔄 **Updated** CN language to zh-Hans

## v5.6.3

- ✅ **Added** CN language support (thanks to @sasukebinbin)

## v5.6.2

- 🔧 **Fixed** target values for bone mass

## v5.6.1

- 🔧 **Fixed** default values for lbs

## v5.6.0

- ➕ **Added** a switch to convert kg to lbs

## v5.5.0

- 🔄 **Updated** partial integration of bar-card options for body measurements

  - 🔹 **Supported Options**: color, height, max, min, positions, severity, target, width
  - 🔹 **Unsupported Options**: animation, columns, decimal, complementary, direction
  - 📌 **Severity Options**: from, to, color
  - 📌 **Position Options**: icon, name, minmax, value (inside, outside, off)

  _Tip_: Use the Mi Fit app to check start, destination, color, and target values.

## v5.0.0

- 🚀 **Converted** project to TypeScript (Lit 2)
- 🌍 **Added** automatic number formatting based on system language
- ⚠️ **Alert Icon Behavior**:
  - Flashes red in case of a sensor error
  - Disappears when no issue is detected
- 🔼 **Added** chevron-up and chevron-down icons for measurement details

## v4.6.0

- ✅ **Added** Dutch language support (thanks to @llewy)
- 🔄 **Updated** UI elements and translations
- 🔄 **Changed** model selection to a switch (**Important**: If upgrading from 4.5.0, a return trip is required for settings to apply)

📌 **Special thanks to @typxxi for his invaluable help and extensive testing!**

## v4.5.0

- ➕ **Added** BMI Label

## v4.1.0

- ✅ **Added** German language support
- 🔄 **Updated** icons to official "Mi Fit" icons for the body score

## v4.0.0

- 🔄 **Changed** attribute names to `snake_case` (thanks to [Pavel Popov](https://github.com/dckiller51/bodymiscale/pull/13))
- 🔄 **Replaced** custom icons with materialdesignicons
- ➕ **Added** toolbar for score and service icons

## v3.1.0

- 🌍 **Fully translated** all card elements
- ✅ **Added** Portuguese (pt-BR) language support

## v3.0.0

- 🆕 **Added** card configuration support
- 🌍 **Added** automatic EN/FR translation (contributions welcome for additional languages!)

## v2.1.0

- 🔄 **Updated**: Click on icon to show/hide body score

## v2.0.0

- 🔄 **Updated** UI:
  - Moved states to the left
  - Moved body score attributes to the bottom

## v1.0.1

- ➕ **Added** body score attributes with customization options

  ```yaml
  body:
    water:
      label: 'Water: '
  ```

- ➕ **Added** customizable icons

## v1.0.0

- 🎉 **Initial Release**
