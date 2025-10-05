
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ShippingSystem.Models
{
    public class ShippingContext : IdentityDbContext<ApplicationUser,Roles,string> 
    {
        public DbSet<Employee>? Employees { get; set; }

        public DbSet<Merchant>? Merchants { get; set; }

        public DbSet<Representative>? Representatives { get; set; }

        public DbSet<Branch>? Branches { get; set; }

        public DbSet<Privilege>? Privileges { get; set; }

        public DbSet<Order>? Orders { get; set; }

        public DbSet<OrderType>? OrderTypes { get; set; }

        public DbSet<ShippingType>? ShippingTypes { get; set; }

        public DbSet<PaymentType>? PaymentTypes { get; set; }

        public DbSet<ProductOrder>? ProductOrders { get; set; }

        public DbSet<Governate>? Governates {  get; set; }

        public DbSet<City>? Cities { get; set; }

        public DbSet<VillageCost>? VillageCosts { get; set; }

        public DbSet<RepresentativeGovernate>? RepresentativeGovernates { get; set; }

        public DbSet<WeightOption>? WeightOptions { get; set; }

        public DbSet<SpecialPrice>? SpecialPrices { get; set; }

        public DbSet<Group>? Groups { get; set; }

        public DbSet<UserGroups>? UserGroups { get; set; }

        public DbSet<GroupPrivilege>? GroupPrivilege { get; set; }

        public DbSet<RefreshToken>? RefreshToken { get; set; }

        public DbSet<OrderStatus>? OrderStatus { get; set; }

        public DbSet<OrderStatusRoleDescriptions>? OrderStatusRoleDescriptions { get; set; }


        public ShippingContext(DbContextOptions<ShippingContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {



                //New,

                //Pending,

                //DeliveredToRepresentitive,

                //DeliveredToCustomer,

                //UnReachable,

                //Postponed,

                //DeliveredPartially,

                //CustomerCanceled,

                //RejectedWithPaying,

                //RejectedWithPartialPaying,

                //RejectedFromEmployee,


            builder.Entity<OrderStatus>().HasData(

              new OrderStatus() { Id = 1, Name = "New" },
              new OrderStatus() { Id = 2, Name = "Pending" },
              new OrderStatus() { Id = 3, Name = "DeliveredToRepresentitive" },
              new OrderStatus() { Id = 4, Name = "DeliveredToCustomer" },
              new OrderStatus() { Id = 5, Name = "UnReachable" },
              new OrderStatus() { Id = 6, Name = "Postponed" },
              new OrderStatus() { Id = 7, Name = "DeliveredPartially" },
              new OrderStatus() { Id = 8, Name = "CustomerCanceled" },
              new OrderStatus() { Id = 9, Name = "RejectedWithPaying" },
              new OrderStatus() { Id = 10,Name = "RejectedWithPartialPaying" },
              new OrderStatus() { Id = 11,Name = "RejectedFromEmployee" }
          );


            builder.Entity<OrderStatusRoleDescriptions>().HasData(

                //employee
                new OrderStatusRoleDescriptions() { RoleId="1", StatusId = 1,Description = "جديد" },
                new OrderStatusRoleDescriptions() { RoleId="1", StatusId = 2, Description = "قيد الانتظار" },
                new OrderStatusRoleDescriptions() { RoleId="1", StatusId = 3, Description = "تم التسليم للمندوب" },
                new OrderStatusRoleDescriptions() { RoleId="1", StatusId = 4, Description = "تم التسليم" },
                new OrderStatusRoleDescriptions() { RoleId="1", StatusId = 5, Description = "لا يمكن الوصول" },
                new OrderStatusRoleDescriptions() { RoleId="1", StatusId = 6, Description = "تم التاجيل" },
                new OrderStatusRoleDescriptions() { RoleId="1", StatusId = 7, Description = "تم التسليم جزئيا" },
                new OrderStatusRoleDescriptions() { RoleId="1", StatusId = 8, Description = "تم الالغاء من قبل المستلم" },
                new OrderStatusRoleDescriptions() { RoleId="1", StatusId = 9, Description = "تم الرفض مع الدفع" },
                new OrderStatusRoleDescriptions() { RoleId="1", StatusId = 10, Description = "رفض مع سداد جزء" },
                new OrderStatusRoleDescriptions() { RoleId="1", StatusId = 11, Description = "رفض من الموظف" },

                //merchant
                new OrderStatusRoleDescriptions() { RoleId = "3", StatusId = 1, Description = "جديد" },
                new OrderStatusRoleDescriptions() { RoleId = "3", StatusId = 2, Description = "قيد الانتظار" },
                new OrderStatusRoleDescriptions() { RoleId = "3", StatusId = 3, Description = "تم التسليم للمندوب" },
                new OrderStatusRoleDescriptions() { RoleId = "3", StatusId = 4, Description = "تم التسليم" },
                new OrderStatusRoleDescriptions() { RoleId = "3", StatusId = 5, Description = "لا يمكن الوصول" },
                new OrderStatusRoleDescriptions() { RoleId = "3", StatusId = 6, Description = "تم التاجيل" },
                new OrderStatusRoleDescriptions() { RoleId = "3", StatusId = 7, Description = "تم التسليم جزئيا" },
                new OrderStatusRoleDescriptions() { RoleId = "3", StatusId = 8, Description = "تم الالغاء من قبل المستلم" },
                new OrderStatusRoleDescriptions() { RoleId = "3", StatusId = 9, Description = "تم الرفض مع الدفع" },
                new OrderStatusRoleDescriptions() { RoleId = "3", StatusId = 10, Description = "رفض مع سداد جزء" },
                new OrderStatusRoleDescriptions() { RoleId = "3", StatusId = 11, Description = "رفض من الموظف" },

                //representative
                new OrderStatusRoleDescriptions() { RoleId = "2", StatusId = 3, Description = "تم الاسناد" },
                new OrderStatusRoleDescriptions() { RoleId = "2", StatusId = 4, Description = "تم التسليم" },
                new OrderStatusRoleDescriptions() { RoleId = "2", StatusId = 5, Description = "لا يمكن الوصول" },
                new OrderStatusRoleDescriptions() { RoleId = "2", StatusId = 6, Description = "تم التاجيل" },
                new OrderStatusRoleDescriptions() { RoleId = "2", StatusId = 7, Description = "تم التسليم جزئيا" },
                new OrderStatusRoleDescriptions() { RoleId = "2", StatusId = 8, Description = "تم الالغاء من قبل المستلم" },
                new OrderStatusRoleDescriptions() { RoleId = "2", StatusId = 9, Description = "تم الرفض مع الدفع" },
                new OrderStatusRoleDescriptions() { RoleId = "2", StatusId = 10, Description = "رفض مع سداد جزء" }


            );

            builder.Entity<RepresentativeGovernate>().HasKey("Representative_Id", "Governate_Id");

            builder.Entity<OrderStatusRoleDescriptions>().HasKey(ck => new {ck.StatusId,ck.RoleId});

            builder.Entity<Employee>(entity => { entity.ToTable("Employees"); });

            builder.Entity<Merchant>(entity => { entity.ToTable("Merchants"); });

            builder.Entity<Representative>(entity => { entity.ToTable("Representatives"); });

            builder.Entity<UserGroups>().HasKey("UserId", "GroupId");

            base.OnModelCreating(builder);
        }






    }
}
