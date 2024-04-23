'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CommentsProvider } from '@udecode/plate-comments';
import {
  createPlateEditor,
  deserializeHtml,
  Plate,
  TElement,
} from '@udecode/plate-common';
import { serializeHtml } from '@udecode/plate-serializer-html';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { CommentsPopover } from '@/components/plate-ui/comments-popover';
import { Editor } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { MentionCombobox } from '@/components/plate-ui/mention-combobox';
import { TooltipProvider } from '@/components/plate-ui/tooltip';

import { plugins } from './plugins';

export const PlateEditor = ({ initialHtml = '' }: { initialHtml?: string }) => {
  const [mount, setMount] = useState<boolean>(false);
  const editorRef = useRef<any>();
  const plateEditor = useMemo(
    () =>
      createPlateEditor({
        plugins,
      }),
    []
  );

  const initialValue = useMemo(() => {
    return deserializeHtml(plateEditor, {
      element: initialHtml,
    }) as TElement[];
  }, [initialHtml]);

  const onChange = (value: any) => {
    const htmlStr = serializeHtml(plateEditor, {
      nodes: value,
      dndWrapper: (props) => <DndProvider backend={HTML5Backend} {...props} />,
    });
    console.log(htmlStr);
  };

  useEffect(() => {
    setMount(true);
  }, []);

  return mount ? (
    <TooltipProvider>
      <DndProvider backend={HTML5Backend}>
        <CommentsProvider users={{}} myUserId="1">
          <Plate
            onChange={onChange}
            editorRef={editorRef}
            plugins={plugins}
            initialValue={initialValue}
          >
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>

            <Editor />

            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>
            <MentionCombobox items={[]} />
            <CommentsPopover />
          </Plate>
        </CommentsProvider>
      </DndProvider>
    </TooltipProvider>
  ) : null;
};

export default PlateEditor;
