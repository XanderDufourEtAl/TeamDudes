import Widget from './Widget';
import { useState } from 'react';

/*
    The widget page is the main page of the application, could be considered the dashboard.
    it is fed widgets from the widget component and handles the logic of adding and placing widgets.
    If more components are added, add them to the type parameters throughout ("Baseball" | "Hockey" | "new_component").
    Along with that add a button to the modal-content section
    
    General Setup: individual_sport.tsx -> widget.tsx -> widgetpage.tsx
*/



function WidgetPage() {
    const [freeCells, setFreeCells] = useState<Set<string>>(new Set());
    const [widgets, setWidgets] = useState<{ id: number; type: "Baseball" | "Hockey"; position: { x: number; y: number } }[]>([]);
    const [showModal, setShowModal] = useState(false);

    // Handles moving the widgets around the grid and prevents overlap
    const movingHandler = (oldCell: string, newCell: string) => {
        setFreeCells((prev) => {
            const updated = new Set(prev);
            if (oldCell) updated.delete(oldCell);
            updated.add(newCell);
            return updated;
        });
    };
    //Function to handle adding widgets to the grid from the add widget button
    const addWidget = (type: "Baseball" | "Hockey") => {
        const newWidget = {
            id: widgets.length + 1,
            type,
            position: { x: (225*widgets.length), y: 0 }, // Default position
        };
        setWidgets((prev) => [...prev, newWidget]);
        setShowModal(false); // Close the modal after adding
    };

    return (
        <div className="widget-page">
            <div className="add-widget">
            <button onClick={() => setShowModal(true)}>Add Widget</button>
            </div>

            {/* Modal for selecting widget type */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Select Widget Type</h3>
                        <button onClick={() => addWidget('Hockey')}>Hockey</button>
                        <button onClick={() => addWidget('Baseball')}>Baseball</button>
                        {/* Add more buttons for new components here */}
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {widgets.map((widget) => (
                <Widget
                    key={widget.id}
                    initialPosition={widget.position}
                    gridSize={225}
                    freeCells={freeCells}
                    onMove={movingHandler}
                    widgetType={widget.type}
                />
            ))}
        </div>
    );
}

export default WidgetPage;