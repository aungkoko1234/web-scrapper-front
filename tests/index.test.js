/* eslint-disable no-undef */
// import DesktopTableViewComponent from "../src/components/DesktopTableViewComponent/DesktopTableViewComponent";
// import ResponsiveAppBar from "../src/components/AppBar/AppBar";
import DialogComponent from "../components/DialogComponent";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
const headers = [
  {
    name: "id",
    title: "#Id",
    align: "left",
    type: "text",
  },
  {
    name: "title",
    title: "#Title",
    align: "left",
    type: "block",
  },
  {
    name: "thumbnailUrl",
    title: "#Image",
    align: "left",
    type: "image",
  },
  {
    name: "View",
    title: "Action",
    align: "left",
    type: "action",
    action: () => {},
  },
];
const mockData = [
  {
    id: 1,
    title: "Testing 1",
    thumbnailUrl: "https://via.placeholder.com/600/92c952",
  },
  {
    id: 2,
    title: "Testing 2",
    thumbnailUrl: "https://via.placeholder.com/600/92c952",
  },
];
// describe("Table View Component", () => {
//   it("renders a Desktop Table View", () => {
//     render(<DesktopTableViewComponent headers={headers} data={mockData} />);
//     // check if all components are rendered
//     expect(screen.getByTestId("desktop-view")).toBeInTheDocument();
//     expect(screen.getByTestId("table-container")).toBeInTheDocument();
//     expect(screen.getByTestId("table")).toBeInTheDocument();
//     expect(screen.getByTestId("table-head")).toBeInTheDocument();
//     expect(screen.getByTestId("table-body")).toBeInTheDocument();
//   });
//   it("renders Skeleton when loading", () => {
//     render(
//       <DesktopTableViewComponent
//         headers={headers}
//         data={mockData}
//         isLoading={true}
//       />
//     );
//     // check if all components are rendered
//     expect(screen.getByTestId("desktop-view")).toBeInTheDocument();
//     expect(screen.getByTestId("table-container")).toBeInTheDocument();
//     expect(screen.getByTestId("table-loading")).toBeInTheDocument();
//     expect(screen.getByTestId("table-loading-head")).toBeInTheDocument();
//     expect(screen.getByTestId("table-loading-skeleton")).toBeInTheDocument();
//   });
// });

// describe("App bar Component", () => {
//   beforeEach(() => {
//     render(
//       <ResponsiveAppBar title="" isDarkTheme={true} onChangeTheme={() => {}} />
//     );
//   });
//   it("renders a App Bar", () => {
//     // check if all components are rendered
//     expect(screen.getByTestId("app-bar")).toBeInTheDocument();
//     expect(screen.getByTestId("theme-switch")).toBeInTheDocument();
//   });
//   it("check Dark Theme Switch", () => {
//     userEvent.click(screen.getByTestId("theme-switch"));
//     expect(screen.getByLabelText("Dark Theme")).toBeChecked();
//   });
// });

describe("Dialog Component", () => {
  it("renders a Dialog", () => {
    render(
      <DialogComponent isOpen={true} title="Test Dialog" onClose={() => {}}>
        <div data-testid="dialog-test">Hello</div>
      </DialogComponent>
    );
    // check if all components are rendered
    expect(screen.getByTestId("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-title")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-child")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-test")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-actions")).toBeInTheDocument();
  });

  it("renders a Dialog with display:false", () => {
    render(
      <DialogComponent isOpen={false} title="Test Dialog" onClose={() => {}}>
        <div data-testid="dialog-test">Hello</div>
      </DialogComponent>
    );
    // check if all components are rendered
    expect(screen.getByTestId("dialog")).not.toBeVisible();
  });
});
