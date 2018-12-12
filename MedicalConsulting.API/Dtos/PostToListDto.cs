using System;
using System.Collections.Generic;
using MedicalConsulting.API.Models;

namespace MedicalConsulting.API.Dtos
{
    public class PostToListDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Excerpt { get; set; }
        public DateTime Created { get; set; }
        public string Url { get; set; }
        public int visits { get; set; }

        public IList<PostPhoto> PostPhotos { get; set; }
    }
}