locals {
  domain_name = trimsuffix(var.domain_name, ".")

  dns_records = {
    apex_a = {
      name    = local.domain_name
      type    = "A"
      ttl     = 600
      records = ["76.76.21.21"]
    }
    apex_openai_verification = {
      name    = local.domain_name
      type    = "TXT"
      ttl     = 600
      records = ["openai-domain-verification=dv-COOtQFg2BfzIN6FFsx3xwaiO"]
    }
    www_a = {
      name    = "www.${local.domain_name}"
      type    = "A"
      ttl     = 600
      records = ["76.76.21.21"]
    }
    gc_cname = {
      name    = "gc.${local.domain_name}"
      type    = "CNAME"
      ttl     = 600
      records = ["us-tax-residency.vercel.app."]
    }
    staycount_cname = {
      name    = "staycount.${local.domain_name}"
      type    = "CNAME"
      ttl     = 600
      records = ["cname.vercel-dns.com."]
    }
    translator_cname = {
      name    = "translator.${local.domain_name}"
      type    = "CNAME"
      ttl     = 14400
      records = ["cname.vercel-dns.com."]
    }
    translator_vercel_verification = {
      name    = "_vercel.${local.domain_name}"
      type    = "TXT"
      ttl     = 14400
      records = ["vc-domain-verify=translator.kote.fyi,d5d68487428727abd282"]
    }
    staycount_www_cname = {
      name    = "www.staycount.${local.domain_name}"
      type    = "CNAME"
      ttl     = 600
      records = ["cname.vercel-dns.com."]
    }
    drone_a = {
      name    = "drone.${local.domain_name}"
      type    = "A"
      ttl     = 14400
      records = ["76.76.21.21"]
    }
    squarespace_domainconnect = {
      name    = "_domainconnect.${local.domain_name}"
      type    = "CNAME"
      ttl     = 14400
      records = ["_domainconnect.domains.squarespace.com."]
    }
    google_site_verification = {
      name    = "jg5g7ibtoyu6.${local.domain_name}"
      type    = "CNAME"
      ttl     = 300
      records = ["gv-kwsleok5bl4h2r.dv.googlehosted.com."]
    }
  }
}

resource "aws_route53_zone" "primary" {
  name = local.domain_name

  tags = {
    App       = var.app_name
    ManagedBy = "terraform"
  }
}

resource "aws_route53_record" "public_dns" {
  for_each = local.dns_records

  zone_id = aws_route53_zone.primary.zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = each.value.ttl
  records = each.value.records

  allow_overwrite = true
}
