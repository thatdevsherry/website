---
title: "Accessing root shell of my home router"
description: "How I got root access into my ISP router."
datetime: "21 March, 2021"
tags: ["tech"]
---

## Router Details

```
Vendor: FiberHome Telecommunication Technologies Co. Ltd
Software Version: 3.10L.02.A2pB022g.d20h
Bootloader (CFE) Version: before 1.0.37-5.12
```

### Analyzing Attack Points

I had the following services enabled:

- FTP
- HTTP
- SNMP
- TELNET
- TFTP

I had previously connected to **FTP** but the `ls` commands never worked so I didn't bother diving into it more.

I had no experience with **SNMP** and **TFTP** so my only option was to try **TELNET**.

### Accessing Telnet

The password for **FTP** was the same as the default HTTP login one. What was interesting is that I had changed my HTTP login password, and **that also changed the password of telnet** login to the one I updated to, so my login to telnet was pretty straight forward.

### Exploring Telnet

It was a typical telnet instance that I had also seen way back when I first tinkered with telnet on the router. It had the common telnet commands along with some specific ones like testing LEDs on the router, but that was not much fun.

### Curiosity

There was one command in special that I liked, the `ps` command. I felt like the memory of the router was always on the edge, so I thought why not see what processes are running and if I can find something. The output was pretty normal, showing some `dhcpd, init` etc but there were some lines that caught my attention

```
  PID  Uid     VmSize Stat Command
   37 admin       316 S   -sh
12120 admin       280 S   sh -c ps
12121 admin       272 R   ps
```

So this meant some shell processes were running, and the last two ones were because of me issuing the `ps` command.

The heading caught my attention. I entered `ps` as a command, and yes the table also says that `ps` is a command. Now, if all these are commands, would `sh -c ps`, or if I trim it down to just `sh` be a valid command?

I tried that and was pleased to see the following output:

```
BusyBox v1.00 (2011.08.24-03:20+0000) Built-in shell (msh)
Enter 'help' for a list of built-in commands.

#
```

I was dropped into a shell, and issuing `ls` now showed all the linux folders like `etc, var` etc. I could now see all the files, files that had the values for configuring WAN, DHCP, NAS etc.

### Conclusion

Seeing the busybox version, it seems the software was never updated after 2011 so it was bound to have more flaws, one of them being what I had just discovered.

Overall it was a good first step in me trying out security testing.
