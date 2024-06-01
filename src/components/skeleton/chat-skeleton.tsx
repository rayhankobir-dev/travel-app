import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";

export function AdminChatUserListSkeleton() {
  return (
    <main className="w-48 border-r">
      <section className="sticky py-5 px-3 space-y-2 border-b">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-2" />
      </section>
      <section className="h-full">
        <ChatListSkeleton />
      </section>
    </main>
  );
}

export function AdminChatSkeleton() {
  return (
    <section className="flex-1 w-full flex flex-col">
      <ChatHeaderSkeleton />
      <ConversiationsSkeleton />
      <ChatInputSkeleton />
    </section>
  );
}

export function ChatHeaderSkeleton() {
  return (
    <header className="flex items-center gap-4 px-4 py-4 border-b">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-2.5 w-24" />
      </div>
    </header>
  );
}

export function ConversiationsSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <ChatSkeleton dir="ltr" />
      <ChatSkeleton dir="rtl" />
      <ChatSkeleton dir="ltr" />
      <ChatSkeleton dir="rtl" />
      <ChatSkeleton dir="ltr" />
      <ChatSkeleton dir="rtl" />
      <ChatSkeleton dir="ltr" />
      <ChatSkeleton dir="ltr" />
    </div>
  );
}

export function ChatSkeleton({ dir }: { dir: "rtl" | "ltr" }) {
  return (
    <div dir={dir} className="flex items-start gap-4 py-1.5">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton
          className={cn(
            "h-8 min-w-48 rounded-xl",
            dir == "rtl" ? "rounded-br-none" : "rounded-bl-none"
          )}
        />
        <div className="flex gap-3">
          <Skeleton className="h-2 w-10" />
          <Skeleton className="h-2 w-10" />
        </div>
      </div>
    </div>
  );
}

export function ChatInputSkeleton() {
  return (
    <footer className="border-t px-4 py-3">
      <Skeleton className="h-10 w-full rounded-lg" />
    </footer>
  );
}

export function ChatListSkeleton() {
  return (
    <Fragment>
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
    </Fragment>
  );
}

function ChatListItem() {
  return (
    <div className="flex items-center gap-2.5 py-1.5 px-3 border-b">
      <Skeleton className="min-w-10 h-10 rounded-full" />
      <div className="w-full space-y-2">
        <Skeleton className="h-3.5 w-full rounded-xl" />
        <div className="flex gap-3">
          <Skeleton className="h-2 w-10" />
          <Skeleton className="h-2 w-10" />
        </div>
      </div>
    </div>
  );
}
