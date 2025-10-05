namespace ShippingSystem.Enumerations
{
    public enum OrderStatusEnum
    {
        New,

        Pending,

        DeliveredToRepresentitive,

        DeliveredToCustomer,

        UnReachable,

        Postponed,

        DeliveredPartially,

        CustomerCanceled,

        RejectedWithPaying,

        RejectedWithPartialPaying,

        RejectedFromEmployee,

    }
}
