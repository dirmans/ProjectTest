using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectTest.DTOs
{
    public class PromotionDto
    {
        public string PromoId { get; set; }
        public string PromoType { get; set; }
        public int ValueType { get; set; }
        public string PromoDescription { get; set; }
        public DateTime PromoStart { get; set; }
        public DateTime PromoEnd { get; set; }
        public List<StoreDto> StoreList { get; set; }
    }
}
