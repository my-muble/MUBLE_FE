import { semanticTokens } from './semantic';
import { withOpacity } from './utils';

export const componentTokens = {
  topBar: {
    background: {
      default: semanticTokens.color.background.primary,
    },

    title: {
      default: semanticTokens.color.text.primary,
      disabled: semanticTokens.color.text.disabled,
      inverse: semanticTokens.color.text.disabled,
    },

    icon: {
      default: semanticTokens.color.icon.tertiary,
      pressed: semanticTokens.color.icon.secondary,
      disabled: semanticTokens.color.icon.disabled,
    },
  },

  navigationBar: {
    background: {
      default: withOpacity(semanticTokens.color.background.primary, 0.8),
    },

    border: {
      default: semanticTokens.color.background.primary,
    },

    icon: {
      active: semanticTokens.color.icon.primary,
      inactive: semanticTokens.color.icon.tertiary,
      pressed: semanticTokens.color.icon.primary,
      disabled: semanticTokens.color.icon.disabled,
    },

    label: {
      active: semanticTokens.color.text.primary,
      inactive: semanticTokens.color.text.tertiary,
      disabled: semanticTokens.color.text.disabled,
    },

    indicator: {
      active: semanticTokens.color.action.primary,
    },
  },

  button: {
    primary: {
      background: {
        default: semanticTokens.color.action.primary,
        pressed: semanticTokens.color.action.pressed,
        disabled: semanticTokens.color.action.disabled,
      },

      text: {
        default: semanticTokens.color.text.inverse,
        disabled: semanticTokens.color.text.disabled,
      },

      icon: {
        default: semanticTokens.color.icon.primary,
        disabled: semanticTokens.color.icon.disabled,
        destructive: semanticTokens.color.icon.destructive,
      },
    },

    secondary: {
      background: {
        default: semanticTokens.color.background.primary,
        pressed: semanticTokens.color.background.secondary,
        disabled: semanticTokens.color.background.tertiary,
      },

      text: {
        default: semanticTokens.color.text.primary,
        disabled: semanticTokens.color.text.disabled,
      },

      icon: {
        default: semanticTokens.color.icon.primary,
        disabled: semanticTokens.color.icon.disabled,
      },
    },

    tertiary: {
      text: {
        default: semanticTokens.color.text.primary,
        pressed: semanticTokens.color.text.secondary,
        disabled: semanticTokens.color.text.disabled,
      },

      icon: {
        default: semanticTokens.color.icon.primary,
        pressed: semanticTokens.color.icon.secondary,
        disabled: semanticTokens.color.icon.disabled,
      },
    },

    destructive: {
      background: {
        default: semanticTokens.color.background.destructive,
      },

      text: {
        destructive: semanticTokens.color.icon.destructive,
      },

      border: {
        destructive: semanticTokens.color.icon.destructive,
      },

      icon: {
        destructive: semanticTokens.color.icon.destructive,
      },

      radius: {
        number: semanticTokens.radius.button,
      },
    },
  },

  input: {
    background: {
      default: semanticTokens.color.background.primary,
      focus: semanticTokens.color.background.secondary,
      disabled: semanticTokens.color.background.tertiary,
    },

    text: {
      value: semanticTokens.color.text.primary,
      placeholder: semanticTokens.color.text.disabled,
      disabled: semanticTokens.color.text.disabled,
    },

    icon: {
      default: semanticTokens.color.icon.secondary,
      focus: semanticTokens.color.icon.primary,
      disabled: semanticTokens.color.icon.disabled,
    },

    border: {
      default: semanticTokens.color.border.default,
      focus: semanticTokens.color.border.strong,
      error: semanticTokens.color.status.error,
      disabled: semanticTokens.color.border.subtle,
    },

    radius: {
      number: semanticTokens.radius.button,
    },
  },

  textField: {
    background: {
      default: semanticTokens.color.background.primary,
      focus: semanticTokens.color.background.secondary,
      disabled: semanticTokens.color.background.tertiary,
    },

    text: {
      value: semanticTokens.color.text.primary,
      placeholder: semanticTokens.color.text.disabled,
      disabled: semanticTokens.color.text.disabled,
    },

    supportingText: {
      default: semanticTokens.color.text.tertiary,
      error: semanticTokens.color.status.error,
      disabled: semanticTokens.color.text.disabled,
    },

    icon: {
      default: semanticTokens.color.icon.secondary,
      focus: semanticTokens.color.icon.primary,
      disabled: semanticTokens.color.icon.disabled,
    },

    border: {
      default: semanticTokens.color.border.default,
      focus: semanticTokens.color.border.strong,
      error: semanticTokens.color.status.error,
      disabled: semanticTokens.color.border.subtle,
    },

    radius: {
      number: semanticTokens.radius.button,
    },
  },

  segmentedControl: {
    text: {
      active: semanticTokens.color.text.primary,
      inactive: semanticTokens.color.text.tertiary,
      disabled: semanticTokens.color.text.disabled,
    },

    background: {
      active: semanticTokens.color.background.secondary,
      inactive: semanticTokens.color.background.primary,
      disabled: semanticTokens.color.background.tertiary,
    },

    indicator: {
      active: semanticTokens.color.action.primary,
      inactive: semanticTokens.color.border.subtle,
    },

    border: {
      default: semanticTokens.color.border.subtle,
    },
  },

  card: {
    background: {
      default: semanticTokens.color.background.primary,
      pressed: semanticTokens.color.background.tertiary,
      disabled: semanticTokens.color.background.tertiary,
    },

    text: {
      title: semanticTokens.color.text.primary,
      body: semanticTokens.color.text.secondary,
      metadata: semanticTokens.color.text.tertiary,
      inverse: semanticTokens.color.text.inverse,
      disabled: semanticTokens.color.text.disabled,
    },

    icon: {
      default: semanticTokens.color.icon.secondary,
      disabled: semanticTokens.color.icon.disabled,
    },

    border: {
      default: semanticTokens.color.border.subtle,
      selected: semanticTokens.color.action.primary,
    },

    radius: {
      number: semanticTokens.radius.card,
    },

    overlayIconButton: {
      state: {
        default: withOpacity(semanticTokens.color.background.inverse, 0.4),

        pressed: withOpacity(semanticTokens.color.background.inverse, 0.5),
      },

      icon: {
        lyrics: semanticTokens.color.icon.inverse,
      },
    },
  },

  search: {
    searchBar: {
      background: {
        default: semanticTokens.color.background.primary,
        pressed: semanticTokens.color.background.secondary,
        disabled: semanticTokens.color.background.tertiary,
      },

      text: {
        value: semanticTokens.color.text.primary,
        placeholder: semanticTokens.color.text.disabled,
      },

      icon: {
        search: semanticTokens.color.icon.disabled,
        clear: semanticTokens.color.icon.tertiary,
        back: semanticTokens.color.icon.secondary,
      },

      border: {
        default: semanticTokens.color.border.subtle,
        focus: semanticTokens.color.border.strong,
      },
    },

    recentSearchItem: {
      text: {
        default: semanticTokens.color.text.primary,
      },

      icon: {
        clear: semanticTokens.color.icon.secondary,
      },
    },

    searchSuggestionItem: {
      text: {
        matched: semanticTokens.color.text.primary,
        suggested: semanticTokens.color.text.tertiary,
      },

      icon: {
        search: semanticTokens.color.icon.secondary,
      },
    },

    searchResultItem: {
      background: {
        pressed: semanticTokens.color.background.primary,
        artworkPlaceholder: semanticTokens.color.background.primary,
      },

      text: {
        title: semanticTokens.color.text.primary,
        metadat: semanticTokens.color.text.tertiary,
      },

      icon: {
        chevron: semanticTokens.color.icon.secondary,
      },
    },
  },

  modal: {
    background: {
      default: semanticTokens.color.background.secondary,
    },

    text: {
      title: semanticTokens.color.text.primary,
      body: semanticTokens.color.text.secondary,
    },

    border: {
      default: semanticTokens.color.border.subtle,
    },

    radius: {
      number: semanticTokens.radius.thumbnail,
    },
  },

  divider: {
    default: semanticTokens.color.border.default,
    strong: semanticTokens.color.border.strong,
  },

  sectionHeader: {
    icon: {
      default: semanticTokens.color.icon.tertiary,
      pressed: semanticTokens.color.icon.secondary,
    },

    text: {
      title: semanticTokens.color.text.primary,
      meta: semanticTokens.color.text.tertiary,
      default: semanticTokens.color.text.tertiary,
      pressed: semanticTokens.color.text.secondary,
    },
  },

  menu: {
    list: {
      number: semanticTokens.radius.thumbnail,

      background: {
        default: semanticTokens.color.background.primary,
      },

      border: {
        default: {
          default: semanticTokens.color.border.default,
        },
      },
    },

    item: {
      text: {
        default: semanticTokens.color.text.secondary,
        pressed: semanticTokens.color.text.secondary,
      },

      icon: {
        default: semanticTokens.color.icon.secondary,
        pressed: semanticTokens.color.icon.secondary,
        destructive: semanticTokens.color.icon.destructive,
      },

      background: {
        default: semanticTokens.color.background.primary,
        pressed: semanticTokens.color.background.tertiary,
      },

      border: {
        default: semanticTokens.color.border.default,
      },
    },

    section: {
      icon: semanticTokens.color.icon.tertiary,
      border: semanticTokens.color.border.default,
      text: semanticTokens.color.text.secondary,

      background: {
        default: semanticTokens.color.background.primary,
        pressed: semanticTokens.color.background.tertiary,
      },
    },
  },

  dropdown: {
    background: {
      default: semanticTokens.color.background.primary,
    },

    text: {
      default: semanticTokens.color.text.secondary,
      disabled: semanticTokens.color.text.disabled,
    },

    icon: {
      default: semanticTokens.color.icon.secondary,
      disabled: semanticTokens.color.icon.disabled,
    },
  },

  toast: {
    background: {
      default: semanticTokens.color.background.inverse,
    },

    text: {
      title: semanticTokens.color.text.inverse,
    },

    icon: {
      default: semanticTokens.color.icon.inverse,
    },
  },

  checkboxItem: {
    text: {
      title: semanticTokens.color.text.secondary,
    },

    icon: {
      default: semanticTokens.color.icon.tertiary,
      pressed: semanticTokens.color.icon.primary,
    },
  },

  recordContent: {
    text: {
      bodyText: semanticTokens.color.text.primary,
      metadata: semanticTokens.color.text.tertiary,
    },

    border: {
      default: semanticTokens.color.border.default,
    },
  },

  emptyMessage: {
    message: semanticTokens.color.text.tertiary,
  },

  artistInfoSection: {
    text: {
      name: semanticTokens.color.icon.primary,
      metadata: semanticTokens.color.icon.tertiary,
    },

    background: {
      placeholder: semanticTokens.color.background.primary,
    },
  },

  record: {
    myRecordItem: {
      text: {
        content: semanticTokens.color.text.primary,
        date: semanticTokens.color.text.tertiary,
      },

      icon: {
        chevron: semanticTokens.color.icon.secondary,
      },

      border: {
        divider: semanticTokens.color.border.default,
      },

      background: {
        pressed: semanticTokens.color.background.primary,
      },
    },

    othersRecordItem: {
      text: {
        content: semanticTokens.color.text.primary,
        nickname: semanticTokens.color.text.tertiary,
        date: semanticTokens.color.text.tertiary,
      },

      icon: {
        chevron: semanticTokens.color.icon.secondary,
      },

      background: {
        default: semanticTokens.color.background.primary,
        pressed: semanticTokens.color.background.tertiary,
      },

      border: {
        divider: semanticTokens.color.border.default,
      },
    },

    recordDetailContent: {
      text: {
        content: semanticTokens.color.text.primary,
        nickname: semanticTokens.color.text.tertiary,
        date: semanticTokens.color.text.tertiary,
      },

      icon: {
        chevron: semanticTokens.color.icon.secondary,
      },

      background: {
        default: semanticTokens.color.background.primary,
        pressed: semanticTokens.color.background.tertiary,
      },

      border: {
        divider: semanticTokens.color.border.default,
      },
    },
  },

  archiveTimeline: {
    dateCard: {
      background: {
        default: semanticTokens.color.background.primary,
      },

      recordOverlay: {
        default: withOpacity(semanticTokens.color.background.secondary, 0.4),
      },

      date: {
        text: semanticTokens.color.text.primary,
      },

      metadata: {
        text: semanticTokens.color.text.tertiary,
      },
    },

    recordItem: {
      text: {
        title: semanticTokens.color.text.primary,
        artist: semanticTokens.color.text.secondary,
        recordCount: semanticTokens.color.text.secondary,
        preview: semanticTokens.color.icon.secondary,
      },

      icon: {
        chevron: semanticTokens.color.icon.secondary,
      },
    },

    albumItem: {
      text: {
        title: semanticTokens.color.text.primary,
        meta: semanticTokens.color.text.secondary,
      },
    },

    infoOverlay: {
      background: withOpacity(semanticTokens.color.background.inverse, 0.3),

      text: {
        title: semanticTokens.color.text.inverse,

        meta: withOpacity(semanticTokens.color.text.inverse, 0.8),
      },
    },

    recordEntryItem: {
      background: withOpacity(semanticTokens.color.background.inverse, 0.3),

      text: {
        time: semanticTokens.color.text.tertiary,

        content: withOpacity(semanticTokens.color.text.primary, 0.8),
      },
    },
  },

  chevronButton: {
    background: {
      light: withOpacity(semanticTokens.color.background.secondary, 0.4),

      inverse: withOpacity(semanticTokens.color.background.inverse, 0.4),
    },

    icon: {
      light: semanticTokens.color.icon.disabled,
      inverse: semanticTokens.color.icon.disabled,
    },
  },
} as const;
