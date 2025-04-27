import Widget from './Widget';
function WidgetPage() {
    return (
        <div className="widget-page">
            <Widget initialPosition={{ x: 0, y: 100 }} widgetType="Hockey" />
            <Widget initialPosition={{ x: 300, y: 100 }} widgetType="Baseball" />
        </div>
 )
}
export default WidgetPage;