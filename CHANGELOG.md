# Changelog

All notable changes to this project will be documented in this file.

---

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
- ️ 🔧 **Fixed** Issue with Card Display in Section Mode When Sensors Are Unavailable [[#56](https://github.com/dckiller51/lovelace-body-miscale-card/issues/56)]
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
