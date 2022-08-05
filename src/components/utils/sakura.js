import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

export const sakura = createTheme({
    theme: 'light',
      settings: {
        background: '#ffffff',
        foreground: '#1d233a',
        caret: '#5d00ff',
        selection: '#BBDFFF',
        selectionMatch: '#BBDFFF',
        lineHighlight: '#f1f7f9',
        gutterBackground: '#fff',
        gutterForeground: '#1d233a',
      },
      styles: [
        { tag: t.comment, color: '#008e00' },
        { tag: [t.variableName, t.attributeName], color: '#1d233a' },
        { tag: [t.meta, t.regexp], color: '#c800a4' },
        { tag: [t.string, t.name, t.quote], color: '#2d5e62' },
        { tag: t.number, color: '#3a00dc' },
        { tag: t.bool, color: '#c800a4' },
        { tag: t.null, color: '#c800a4' },
        { tag: [ t.keyword, t.typeName, t.typeOperator ], color: '#c800a4' },
        { tag: t.operator, color: '#c800a4' },
        { tag: t.className, color: '#c800a4' },
        { tag: t.definition(t.typeName), color: '#c800a4' },
        { tag: t.angleBracket, color: '#c800a4' },
        { tag: t.tagName, color: '#c800a4' },
        { tag: t.deleted, color: '#c800a4' },
      ],
})
