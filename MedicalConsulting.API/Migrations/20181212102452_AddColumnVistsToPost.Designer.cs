﻿// <auto-generated />
using System;
using MedicalConsulting.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MedicalConsulting.API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20181212102452_AddColumnVistsToPost")]
    partial class AddColumnVistsToPost
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024");

            modelBuilder.Entity("MedicalConsulting.API.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateAdded");

                    b.Property<string>("Description");

                    b.Property<bool>("IsMain");

                    b.Property<string>("PublicId");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("MedicalConsulting.API.Models.Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<string>("Description");

                    b.Property<string>("Excerpt");

                    b.Property<string>("PublicIdPhoto");

                    b.Property<string>("Title");

                    b.Property<string>("Url");

                    b.Property<int?>("UserId");

                    b.Property<int>("visits");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("MedicalConsulting.API.Models.PostPhoto", b =>
                {
                    b.Property<int>("PostId");

                    b.Property<int>("PhotoId");

                    b.HasKey("PostId", "PhotoId");

                    b.HasIndex("PhotoId");

                    b.ToTable("PostPhotos");
                });

            modelBuilder.Entity("MedicalConsulting.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Country");

                    b.Property<DateTime>("Created");

                    b.Property<DateTime>("DateOfBirth");

                    b.Property<string>("Email");

                    b.Property<string>("Gender");

                    b.Property<bool>("IsAdmin");

                    b.Property<DateTime>("LastActive");

                    b.Property<string>("MedicalHistory");

                    b.Property<string>("Name");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("PhoneNumber");

                    b.Property<string>("PublicIdPhoto");

                    b.Property<string>("Username");

                    b.Property<string>("photoUrl");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("MedicalConsulting.API.Models.Value", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Values");
                });

            modelBuilder.Entity("MedicalConsulting.API.Models.Post", b =>
                {
                    b.HasOne("MedicalConsulting.API.Models.User")
                        .WithMany("Posts")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("MedicalConsulting.API.Models.PostPhoto", b =>
                {
                    b.HasOne("MedicalConsulting.API.Models.Photo", "Photo")
                        .WithMany("PostPhotos")
                        .HasForeignKey("PhotoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MedicalConsulting.API.Models.Post", "Post")
                        .WithMany("PostPhotos")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
