using System.Diagnostics.Metrics;
using System.Diagnostics;

namespace ShippingSystem.Diagnostics
{
    public static class DiagnosticsConfig
    {
        // 1. Centralize the Name (No more magic strings!)
        public const string ServiceName = "ShippingSystem";

        // 2. Expose the ActivitySource globally
        public static readonly ActivitySource Source = new ActivitySource(ServiceName);

        // 3. (Optional) You can also put Metrics here
        public static readonly Meter Meter = new Meter(ServiceName);

        public static readonly Counter<long> OrdersProcessed = Meter.CreateCounter<long>("orders_processed");
    }
}
