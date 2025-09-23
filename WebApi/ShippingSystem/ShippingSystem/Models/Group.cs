namespace ShippingSystem.Models
{
    public class Group
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime Date {  get; set; }

        public bool IsDeleted { get; set; }

        public virtual ICollection<GroupPrivilege> GroupPrivilege { get; set; }

        public virtual IList<UserGroups> UserGroups { get; set; }


    }
}
