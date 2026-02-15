'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, CheckCircle } from 'lucide-react';
import { trackServiceNotificationSubscribe } from '@/lib/analytics';

interface EmailCaptureProps {
  serviceName: string;
  serviceSlug: string;
}

export default function EmailCapture({ serviceName, serviceSlug }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || '';
      const res = await fetch(`${apiUrl}/notifications/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, service: serviceSlug }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to subscribe');
      }

      trackServiceNotificationSubscribe(serviceSlug);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
        <p className="text-green-800 font-medium">
          You&apos;re on the list! We&apos;ll notify you when {serviceName} launches.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 h-12 text-base"
          disabled={loading}
        />
        <Button
          type="submit"
          disabled={loading}
          className="h-12 px-6 bg-[#247AFD] hover:bg-[#1F6AE0] text-white font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Subscribing...
            </>
          ) : (
            'Notify Me'
          )}
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
