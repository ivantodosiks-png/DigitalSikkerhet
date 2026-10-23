import * as Dialog from '@radix-ui/react-dialog'
import { X, AlertTriangle } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from './button'
export function ConfirmDialog({ trigger, title, description, onConfirm }: { trigger: ReactNode; title: string; description: string; onConfirm: () => void }) {
  return <Dialog.Root><Dialog.Trigger asChild>{trigger}</Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="dialog-content">
    <span className="icon-tile amber"><AlertTriangle /></span><Dialog.Title>{title}</Dialog.Title><Dialog.Description>{description}</Dialog.Description>
    <div className="flex justify-end gap-3 mt-6"><Dialog.Close asChild><Button variant="secondary">Avbryt</Button></Dialog.Close><Dialog.Close asChild><Button variant="destructive" onClick={onConfirm}>Ja, slett</Button></Dialog.Close></div>
    <Dialog.Close className="dialog-x" aria-label="Lukk dialog"><X size={18} /></Dialog.Close>
  </Dialog.Content></Dialog.Portal></Dialog.Root>
}
