import Navbar from "@/components/layout/navbar";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./aside";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function AdminLayout() {
  return (
    <div className="fixed top-0 left-0 h-screen w-full  m-0 px-0">
      <Navbar isAdmin={true} />
      <main className="h-full flex mt-16 gap-2 border-t">
        <ResizablePanelGroup direction="horizontal" className="w-full">
          <ResizablePanel defaultSize={18} maxSize={18} minSize={8}>
            <Sidebar className="h-full w-full bg-white" />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={82} className="h-[calc(100%-4rem)]">
            <Outlet />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
